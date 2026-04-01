using System.ComponentModel.DataAnnotations;

namespace TinyTrack.Api.DTOs;

public record CreateFeedingLogDto(
    [Required] DateTime FedAt,
    [Required, Range(0.1, 10000)] decimal MilkPrepared,
    [Required, Range(0, 10000)] decimal MilkFed,
    string? Notes
);

public record UpdateFeedingLogDto(
    DateTime? FedAt,
    [Range(0.1, 10000)] decimal? MilkPrepared,
    [Range(0, 10000)] decimal? MilkFed,
    string? Notes
);

public record FeedingLogResponseDto(
    Guid Id,
    DateTime FedAt,
    decimal MilkPrepared,
    decimal MilkFed,
    decimal WasteAmount,
    string? Notes,
    DateTime CreatedAt,
    DateTime UpdatedAt
);
