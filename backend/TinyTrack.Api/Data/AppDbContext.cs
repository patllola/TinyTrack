using Microsoft.EntityFrameworkCore;
using TinyTrack.Api.Features.Feeding.Models;

namespace TinyTrack.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<FeedingLog> FeedingLogs => Set<FeedingLog>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<FeedingLog>(e =>
        {
            e.ToTable("feeding_logs");
            e.HasKey(x => x.Id);
            e.Property(x => x.Id).HasDefaultValueSql("gen_random_uuid()");
            e.Property(x => x.MilkPrepared).HasColumnType("numeric(6,1)");
            e.Property(x => x.MilkFed).HasColumnType("numeric(6,1)");
            e.Property(x => x.CreatedAt).HasDefaultValueSql("NOW()");
            e.Property(x => x.UpdatedAt).HasDefaultValueSql("NOW()");
            e.HasIndex(x => x.FedAt).HasDatabaseName("idx_feeding_logs_fed_at");
        });
    }
}
