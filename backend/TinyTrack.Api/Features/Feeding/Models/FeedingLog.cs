namespace TinyTrack.Api.Features.Feeding.Models;

public sealed class FeedingLog
{
    public Guid Id { get; set; }
    public DateTime FedAt { get; set; }
    public decimal MilkPrepared { get; set; }
    public decimal MilkFed { get; set; }
    public string? Notes { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
