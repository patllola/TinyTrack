import type { CreateFeedingLogPayload, FeedingLog, UpdateFeedingLogPayload } from "@/types/feeding";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`API ${res.status} ${path}: ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const api = {
  getLogs: () =>
    apiFetch<FeedingLog[]>("/api/feeding-logs"),

  getLog: (id: string) =>
    apiFetch<FeedingLog>(`/api/feeding-logs/${id}`),

  createLog: (body: CreateFeedingLogPayload) =>
    apiFetch<FeedingLog>("/api/feeding-logs", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  updateLog: (id: string, body: UpdateFeedingLogPayload) =>
    apiFetch<FeedingLog>(`/api/feeding-logs/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  deleteLog: (id: string) =>
    apiFetch<void>(`/api/feeding-logs/${id}`, { method: "DELETE" }),
};
