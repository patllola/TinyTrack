# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## IDE Setup

- **Backend** — developed in **JetBrains Rider**. Run/debug the ASP.NET Core project via Rider's run configurations. EF Core migrations can be run via Rider's built-in terminal or the .NET CLI commands below.
- **Frontend** — developed in **Visual Studio Code**.

## Project Overview

TinyTrack is a baby feeding tracker app — a monorepo with a **Next.js 14 frontend** and an **ASP.NET Core 8 backend**, backed by **PostgreSQL on Neon**.

## Development Commands

### Frontend (`/frontend`)
```bash
cd frontend
npm install          # Install dependencies
npm run dev          # Dev server at http://localhost:3000
npm run build        # Production build
npm run lint         # ESLint
```

### Backend (`/backend/TinyTrack.Api`)
```bash
cd backend/TinyTrack.Api
dotnet restore                   # Restore NuGet packages
dotnet run                       # Dev server at http://localhost:5000
dotnet ef database update        # Apply EF Core migrations
dotnet ef migrations add <Name>  # Create a new migration
```

Swagger UI is available at `http://localhost:5000/swagger` in development.

## Environment Setup

**Frontend** — create `frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

**Backend** — create `backend/TinyTrack.Api/appsettings.Development.json`:
```json
{
  "ConnectionStrings": {
    "Neon": "Host=...;Database=tinytrack;Username=...;Password=...;SSL Mode=Require"
  }
}
```

## Architecture

### Frontend (`frontend/src/`)
- **`app/`** — Next.js App Router pages. `page.tsx` is the dashboard; `log/page.tsx` is the feeding log form.
- **`components/feeding/`** — Domain components: `FeedingForm`, `FeedingList`, `FeedingCard`, `StatsBar`.
- **`components/ui/`** — Generic primitives: `Button`, `Card`, `Input`, `Badge`, `Textarea`.
- **`lib/api.ts`** — All backend calls go through this fetch-based API client.
- **`lib/utils.ts`** — Date/time formatting helpers (`formatTime`, `timeAgo`, `formatMl`, etc.).
- **`types/`** — TypeScript interfaces for `FeedingLog` and DTOs.

`next.config.ts` proxies `/api/*` requests to the backend, so the frontend always calls relative `/api/` paths.

### Backend (`backend/TinyTrack.Api/`)
- **`Program.cs`** — DI registration, CORS, Swagger, auto-migration on startup, and route mounting.
- **`Endpoints/FeedingLogEndpoints.cs`** — Minimal API route handlers for all CRUD operations under `/api/feeding-logs`.
- **`Services/FeedingLogService.cs`** — Business logic and validation (e.g., `milk_fed <= milk_prepared`, `fedAt` not in future). This is where computed fields like `WasteAmount` are calculated.
- **`Data/AppDbContext.cs`** — EF Core DbContext. Uses snake_case column naming and has an index on `fed_at`.
- **`DTOs/FeedingLogDtos.cs`** — Request/response contracts separate from the domain model.

### Data Flow
Frontend (`lib/api.ts`) → Next.js proxy → ASP.NET Core Endpoint → `FeedingLogService` (validates + maps) → EF Core → PostgreSQL (Neon)

### Database
Single table `feeding_logs` with UUID primary key, `fed_at` (indexed), `milk_prepared`, `milk_fed`, `notes`, and audit timestamps. Schema is managed entirely via EF Core migrations.
