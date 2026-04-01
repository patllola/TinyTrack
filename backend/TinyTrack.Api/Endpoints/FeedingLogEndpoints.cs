using TinyTrack.Api.DTOs;
using TinyTrack.Api.Services;

namespace TinyTrack.Api.Endpoints;

public static class FeedingLogEndpoints
{
    public static void MapFeedingLogEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/feeding-logs").WithTags("FeedingLogs");

        group.MapGet("/", async (FeedingLogService svc) =>
            Results.Ok(await svc.GetAllAsync()))
            .WithName("GetFeedingLogs")
            .Produces<List<FeedingLogResponseDto>>();

        group.MapGet("/{id:guid}", async (Guid id, FeedingLogService svc) =>
        {
            var dto = await svc.GetByIdAsync(id);
            return dto is null ? Results.NotFound() : Results.Ok(dto);
        })
        .WithName("GetFeedingLog")
        .Produces<FeedingLogResponseDto>()
        .Produces(404);

        group.MapPost("/", async (CreateFeedingLogDto body, FeedingLogService svc) =>
        {
            var (dto, error) = await svc.CreateAsync(body);
            if (error is not null)
                return Results.BadRequest(new { error });
            return Results.Created($"/api/feeding-logs/{dto!.Id}", dto);
        })
        .WithName("CreateFeedingLog")
        .Produces<FeedingLogResponseDto>(201)
        .Produces(400);

        group.MapPut("/{id:guid}", async (Guid id, UpdateFeedingLogDto body, FeedingLogService svc) =>
        {
            var (dto, error) = await svc.UpdateAsync(id, body);
            if (error == "not_found") return Results.NotFound();
            if (error is not null) return Results.BadRequest(new { error });
            return Results.Ok(dto);
        })
        .WithName("UpdateFeedingLog")
        .Produces<FeedingLogResponseDto>()
        .Produces(400)
        .Produces(404);

        group.MapDelete("/{id:guid}", async (Guid id, FeedingLogService svc) =>
        {
            var deleted = await svc.DeleteAsync(id);
            return deleted ? Results.NoContent() : Results.NotFound();
        })
        .WithName("DeleteFeedingLog")
        .Produces(204)
        .Produces(404);
    }
}
