using Microsoft.EntityFrameworkCore;
using TinyTrack.Api.Data;
using TinyTrack.Api.Features.Users.DTOs;
using TinyTrack.Api.Features.Users.Models;

namespace TinyTrack.Api.Features.Users.Services;

public class UserService(AppDbContext dbContext)
{
    public async Task<UserProfileResponseDto?> GetProfileAsync(Guid userId)
    {
        var user = await dbContext.Users.FindAsync(userId);
        return user == null ? null : MapToDto(user);
    }

    public async Task<(UserProfileResponseDto? dto, string? error)> UpdateProfileAsync(Guid userId, UpdateUserProfileDto input)
    {
        var user = await dbContext.Users.FindAsync(userId);
        if (user == null)
        {
            return (null, "not_found");
        }

        user.FullName = input.FullName;
        user.Email = input.Email;
        user.ProfilePictureUrl = input.ProfilePictureUrl;
        user.PhoneNumber = input.PhoneNumber;
        user.Country = input.Country;
        user.State = input.State;
        user.City = input.City;
        user.Gender = input.Gender;
        user.Address = input.Address;
        user.UpdatedAt = DateTime.UtcNow;

        await dbContext.SaveChangesAsync();
        return (MapToDto(user), null);
    }

    private static UserProfileResponseDto MapToDto(User user) =>
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
