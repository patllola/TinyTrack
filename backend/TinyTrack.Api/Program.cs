using Microsoft.EntityFrameworkCore;
using TinyTrack.Api.Data;
using TinyTrack.Api.Features.Feeding.Services;
using TinyTrack.Api.Features.Users.Services;

var builder = WebApplication.CreateBuilder(args);

// Database
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseNpgsql(builder.Configuration.GetConnectionString("Neon"))
       .UseSnakeCaseNamingConvention());

// Controllers
builder.Services.AddControllers();

// Services
builder.Services.AddScoped<FeedingLogService>();
builder.Services.AddScoped<UserService>();

// CORS — allow Next.js dev server and production frontend
builder.Services.AddCors(opt =>
    opt.AddDefaultPolicy(p =>
        p.WithOrigins(
            "http://localhost:3000",
            builder.Configuration["AllowedOrigin"] ?? "http://localhost:3000"
        )
        .AllowAnyMethod()
        .AllowAnyHeader()));

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "TinyTrack API", Version = "v1", Description = "Baby feeding tracker API" });
});

var app = builder.Build();

// Migrate database on startup (convenient for deployments)
using (var scope = app.Services.CreateScope())
{
    var ctx = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    ctx.Database.Migrate();
}

app.UseSwagger();
app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "TinyTrack API v1"));

app.UseCors();

app.MapControllers();

app.MapGet("/health", () => Results.Ok(new { status = "healthy", timestamp = DateTime.UtcNow }))
   .WithTags("Health");

app.Run();
