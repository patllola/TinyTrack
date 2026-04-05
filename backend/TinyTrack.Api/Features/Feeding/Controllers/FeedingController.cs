using Microsoft.AspNetCore.Mvc;
using TinyTrack.Api.Features.Feeding.DTOs;
using TinyTrack.Api.Features.Feeding.Services;

namespace TinyTrack.Api.Features.Feeding.Controllers;

[ApiController]
[Route("api/feeding-logs")]
[Tags("FeedingLogs")]
public class FeedingController(FeedingLogService feedingLogService) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(typeof(List<FeedingLogResponseDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll()
    {
        var logs = await feedingLogService.GetAllAsync();
        return Ok(logs);
    }

    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(FeedingLogResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(Guid id)
    {
        var log = await feedingLogService.GetByIdAsync(id);
        return log == null ? NotFound() : Ok(log);
    }

    [HttpPost]
    [ProducesResponseType(typeof(FeedingLogResponseDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create(CreateFeedingLogDto input)
    {
        var (dto, error) = await feedingLogService.CreateAsync(input);
        if (error != null)
        {
            return BadRequest(new { error });
        }
        return CreatedAtAction(nameof(GetById), new { id = dto!.GuidId }, dto);
    }

    [HttpPut("{id:guid}")]
    [ProducesResponseType(typeof(FeedingLogResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(Guid id, UpdateFeedingLogDto input)
    {
        var (dto, error) = await feedingLogService.UpdateAsync(id, input);
        if (error == "not_found")
        {
            return NotFound();
        }
        if (error != null)
        {
            return BadRequest(new { error });
        }
        return Ok(dto);
    }

    [HttpDelete("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(Guid id)
    {
        var success = await feedingLogService.DeleteAsync(id);
        return success ? NoContent() : NotFound();
    }
}
