using Microsoft.EntityFrameworkCore;
using TinyTrack.Api.Data;
using TinyTrack.Api.Features.Users.DTOs;
using TinyTrack.Api.Features.Users.Models;

namespace TinyTrack.Api.Features.Users.Services;

public class AuthService(AppDbContext dbContext)
{
    public async Task<(AuthResponseDto? response, string? error)> RegisterAsync(RegisterRequestDto input)
    {
        var existingUser = await dbContext.Users.AnyAsync(x => x.Email == input.Email);
        if (existingUser)
        {
            return (null, "email_already_exists");
        }

        var user = new User
        {
            FullName = input.FullName,
            Email = input.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(input.Password)
        };

        dbContext.Users.Add(user);
        await dbContext.SaveChangesAsync();

        return (new AuthResponseDto(MapToProfileDto(user)), null);
    }

    public async Task<(AuthResponseDto? response, string? error)> LoginAsync(LoginRequestDto input)
    {
        var user = await dbContext.Users.FirstOrDefaultAsync(x => x.Email == input.Email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(input.Password, user.PasswordHash))
        {
            return (null, "invalid_credentials");
        }

        return (new AuthResponseDto(MapToProfileDto(user)), null);
    }

    private static UserProfileResponseDto MapToProfileDto(User user) =>
        new(
            user.Id,
            user.FullName,
            user.Email,
            user.ProfilePictureUrl,
            user.PhoneNumber,
            user.Country,
            user.State,
            user.City,
            user.Gender,
            user.Address,
            user.CreatedAt
        );
}
