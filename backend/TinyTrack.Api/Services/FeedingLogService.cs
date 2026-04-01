using Microsoft.EntityFrameworkCore;
using TinyTrack.Api.Data;
using TinyTrack.Api.DTOs;
using TinyTrack.Api.Models;

namespace TinyTrack.Api.Services;

public class FeedingLogService(AppDbContext db)
{
    public async Task<List<FeedingLogResponseDto>> GetAllAsync() =>
        await db.FeedingLogs
            .OrderByDescending(x => x.FedAt)
            .Select(x => ToDto(x))
            .ToListAsync();

    public async Task<FeedingLogResponseDto?> GetByIdAsync(Guid id) =>
        await db.FeedingLogs
            .Where(x => x.Id == id)
            .Select(x => ToDto(x))
            .FirstOrDefaultAsync();

    public async Task<(FeedingLogResponseDto? dto, string? error)> CreateAsync(CreateFeedingLogDto input)
    {
        var error = Validate(input.MilkPrepared, input.MilkFed, input.FedAt);
        if (error is not null) return (null, error);

        var log = new FeedingLog
        {
            FedAt = input.FedAt.ToUniversalTime(),
            MilkPrepared = input.MilkPrepared,
            MilkFed = input.MilkFed,
            Notes = input.Notes,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        db.FeedingLogs.Add(log);
        await db.SaveChangesAsync();
        return (ToDto(log), null);
    }

    public async Task<(FeedingLogResponseDto? dto, string? error)> UpdateAsync(Guid id, UpdateFeedingLogDto input)
    {
        var log = await db.FeedingLogs.FindAsync(id);
        if (log is null) return (null, "not_found");

        var newPrepared = input.MilkPrepared ?? log.MilkPrepared;
        var newFed = input.MilkFed ?? log.MilkFed;
        var newFedAt = input.FedAt ?? log.FedAt;

        var error = Validate(newPrepared, newFed, newFedAt);
        if (error is not null) return (null, error);

        log.FedAt = newFedAt.ToUniversalTime();
        log.MilkPrepared = newPrepared;
        log.MilkFed = newFed;
        log.Notes = input.Notes ?? log.Notes;
        log.UpdatedAt = DateTime.UtcNow;

        await db.SaveChangesAsync();
        return (ToDto(log), null);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var log = await db.FeedingLogs.FindAsync(id);
        if (log is null) return false;

        db.FeedingLogs.Remove(log);
        await db.SaveChangesAsync();
        return true;
    }

    private static string? Validate(decimal prepared, decimal fed, DateTime fedAt)
    {
        if (prepared <= 0) return "milkPrepared must be greater than 0";
        if (fed < 0) return "milkFed cannot be negative";
        if (fed > prepared) return "milkFed cannot exceed milkPrepared";
        if (fedAt > DateTime.UtcNow.AddMinutes(5)) return "fedAt cannot be in the future";
        return null;
    }

    private static FeedingLogResponseDto ToDto(FeedingLog x) => new(
        x.Id,
        x.FedAt,
        x.MilkPrepared,
        x.MilkFed,
        x.MilkPrepared - x.MilkFed,
        x.Notes,
        x.CreatedAt,
        x.UpdatedAt
    );
}
