using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Selu383.SP24.Api.Data;
using Selu383.SP24.Api.Extensions;
using Selu383.SP24.Api.Features.Authorization;
using Selu383.SP24.Api.Features.Bookings;
using Selu383.SP24.Api.Features.Hotels;
using System.Security.Claims;
using Selu383.SP24.Api.Features.Rooms;

namespace Selu383.SP24.Api.Controllers;

[Route("api/hotels")]
[ApiController]
public class HotelsController : ControllerBase
{
    private readonly DbSet<Hotel> hotels;
    private readonly DataContext dataContext;

    public HotelsController(DataContext dataContext)
    {
        this.dataContext = dataContext;
        hotels = dataContext.Set<Hotel>();
    }

    [HttpGet]
    public IQueryable<HotelDto> GetAllHotels()
    {
        return GetHotelDtos(hotels);
    }

    [HttpGet]
    [Route("{id}")]
    public ActionResult<HotelDto> GetHotelById(int id)
    {
        var result = GetHotelDtos(hotels.Where(x => x.Id == id)).FirstOrDefault();
        if (result == null)
        {
            return NotFound();
        }

        return Ok(result);
    }

    [HttpGet("{hotelId}/bookings")]
    public ActionResult<IEnumerable<BookingDto>> GetHotelBookings(int hotelId)
    {
        var hotel = hotels.FirstOrDefault(x => x.Id == hotelId);
        if (hotel == null)
        {
            return NotFound("Hotel not found");
        }

        var bookings = dataContext.Set<Booking>().Where(b => b.HotelId == hotelId)
                           .Select(b => new BookingDto
                           {
                               Id = b.Id,
                               HotelId = b.HotelId,
                               RoomId = b.RoomId,
                               CheckInDate = b.CheckInDate,
                               CheckOutDate = b.CheckOutDate
                           })
                           .ToList();

        return Ok(bookings);
    }

    [HttpGet("{hotelId}/bookings/{bookingId}")]
    public ActionResult<BookingDto> GetBooking(int hotelId, int bookingId)
    {
        var booking = dataContext.Set<Booking>().FirstOrDefault(b => b.Id == bookingId && b.HotelId == hotelId);
        if (booking == null)
        {
            return NotFound("Booking not found");
        }

        var bookingDto = new BookingDto
        {
            Id = booking.Id,
            HotelId = booking.HotelId,
            RoomId = booking.RoomId,
            CheckInDate = booking.CheckInDate,
            CheckOutDate = booking.CheckOutDate
        };
        Console.WriteLine($"Received roomId: {booking.RoomId}");
        return Ok(bookingDto);
    }


    [HttpPost]
    [Authorize(Roles = RoleNames.Admin)]
    public ActionResult<HotelDto> CreateHotel(HotelDto dto)
    {
        if (IsInvalid(dto))
        {
            return BadRequest();
        }

        var hotel = new Hotel
        {
            Name = dto.Name,
            Address = dto.Address,
            City = dto.City,
            State = dto.State,
            PostalCode = dto.PostalCode,
            ManagerId = dto.ManagerId
        };
        hotels.Add(hotel);

        dataContext.SaveChanges();

        dto.Id = hotel.Id;

        return CreatedAtAction(nameof(GetHotelById), new { id = dto.Id }, dto);
    }

    [HttpPost("{hotelId}/bookings")]
    public async Task<ActionResult<BookingDto>> CreateBooking(int hotelId, BookingDto dto)
    {
        // Check if the user ID can be parsed from the claim
        if (int.TryParse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, out var userId))
        {
            // Retrieve the user entity
            var user = await dataContext.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null)
            {
                return Unauthorized("User not found");
            }

            // Find the hotel by ID
            var hotel = await hotels.FirstOrDefaultAsync(x => x.Id == hotelId);
            if (hotel == null)
            {
                return NotFound("Hotel not found");
            }

            // Ensure that the Room ID is provided and valid
            if (dto.RoomId == 0)
            {
                return BadRequest("Room ID cannot be zero.");
            }

            // Find the room associated with the provided Room ID and Hotel ID
            var room = await dataContext.Room.FirstOrDefaultAsync(r => r.Id == dto.RoomId && r.HotelId == hotelId);
            if (room == null)
            {
                return NotFound("Room not found in the hotel");
            }

            // Create the booking entity
            var booking = new Booking
            {
                HotelId = hotelId,
                UserId = userId,
                RoomId = dto.RoomId,
                CheckInDate = dto.CheckInDate,
                CheckOutDate = dto.CheckOutDate
            };

            // Add the booking to the context and save changes
            dataContext.Add(booking);
            await dataContext.SaveChangesAsync();

            // Update the DTO with the generated booking ID
            dto.Id = booking.Id;

            // Return the created booking DTO along with its location
            return CreatedAtAction(nameof(GetBooking), new { hotelId, bookingId = dto.Id }, dto);
        }
        else
        {
            // If the user ID cannot be parsed from the claim, return a BadRequest
            return BadRequest("Invalid user identifier");
        }
    }


    [HttpPut]
    [Route("{id}")]
    [Authorize]
    public ActionResult<HotelDto> UpdateHotel(int id, HotelDto dto)
    {
        if (IsInvalid(dto))
        {
            return BadRequest();
        }

        var hotel = hotels.FirstOrDefault(x => x.Id == id);
        if (hotel == null)
        {
            return NotFound();
        }

        if (!User.IsInRole(RoleNames.Admin) && User.GetCurrentUserId() != hotel.ManagerId)
        {
            return Forbid();
        }

        hotel.Name = dto.Name;
        hotel.Address = dto.Address;
        if (User.IsInRole(RoleNames.Admin))
        {
            hotel.ManagerId = dto.ManagerId;
        }

        dataContext.SaveChanges();

        dto.Id = hotel.Id;

        return Ok(dto);
    }

    [HttpPut("{hotelId}/bookings/{bookingId}")]
    [Authorize(Roles = RoleNames.Admin)]
    public ActionResult<BookingDto> UpdateBooking(int hotelId, int bookingId, BookingDto dto)
    {
        var booking = dataContext.Set<Booking>().FirstOrDefault(b => b.Id == bookingId && b.HotelId == hotelId);
        if (booking == null)
        {
            return NotFound("Booking not found");
        }

        booking.CheckInDate = dto.CheckInDate;
        booking.CheckOutDate = dto.CheckOutDate;

        dataContext.SaveChanges();

        return Ok(dto);
    }


    [HttpDelete]
    [Route("{id}")]
    [Authorize]
    public ActionResult DeleteHotel(int id)
    {
        var hotel = hotels.FirstOrDefault(x => x.Id == id);
        if (hotel == null)
        {
            return NotFound();
        }

        if (!User.IsInRole(RoleNames.Admin) && User.GetCurrentUserId() != hotel.ManagerId)
        {
            return Forbid();
        }

        hotels.Remove(hotel);

        dataContext.SaveChanges();

        return Ok();
    }

    [HttpDelete("{hotelId}/bookings/{bookingId}")]
    [Authorize(Roles = RoleNames.Admin)]
    public ActionResult DeleteBooking(int hotelId, int bookingId)
    {
        var booking = dataContext.Set<Booking>().FirstOrDefault(b => b.Id == bookingId && b.HotelId == hotelId);
        if (booking == null)
        {
            return NotFound("Booking not found");
        }

        dataContext.Remove(booking);
        dataContext.SaveChanges();

        return Ok();
    }


    private bool InvalidManagerId(int? managerId)
    {
        if (managerId == null)
        {
            return false;
        }

        if (!User.IsInRole(RoleNames.Admin))
        {
            // only admins can change manager ids 
            return false;
        }
        return !dataContext.Set<User>().Any(x => x.Id == managerId);
    }

    private bool IsInvalid(HotelDto dto)
    {
        return string.IsNullOrWhiteSpace(dto.Name) ||
               dto.Name.Length > 120 ||
               string.IsNullOrWhiteSpace(dto.Address) ||
               InvalidManagerId(dto.ManagerId);
    }

    private static IQueryable<HotelDto> GetHotelDtos(IQueryable<Hotel> hotels)
    {
        return hotels
            .Select(x => new HotelDto
            {
                Id = x.Id,
                Name = x.Name,
                Address = x.Address,
                City = x.City,
                State = x.State,
                PostalCode = x.PostalCode,
                ManagerId = x.ManagerId
            });
    }
}
