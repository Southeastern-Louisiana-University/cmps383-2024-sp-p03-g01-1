using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Selu383.SP24.Api.Data;
using Selu383.SP24.Api.Extensions;
using Selu383.SP24.Api.Features.Authorization;
using Selu383.SP24.Api.Features.Bookings;
using Selu383.SP24.Api.Features.Hotels;
using System.Security.Claims;

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
                               // Include more properties if needed
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
            // Include more properties if needed
        };

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
    [Authorize]
    public async Task<ActionResult<BookingDto>> CreateBooking(int hotelId, BookingDto dto)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value); // Get the ID of the logged-in user
        var user = await dataContext.Users.FirstOrDefaultAsync(u => u.Id == userId); // Retrieve the user entity

        if (user == null)
        {
            return Unauthorized("User not found");
        }
        //if (IsInvalidBooking(dto))
        //{
        //    return BadRequest();
        //}

        var hotel = hotels.FirstOrDefault(x => x.Id == hotelId);
        if (hotel == null)
        {
            return NotFound("Hotel not found");
        }

        var room = await dataContext.Room.FirstOrDefaultAsync(r => r.Id == dto.RoomId && r.HotelId == hotelId);
        if (room == null)
        {
            return NotFound("Room not found in the hotel");
        }

        var booking = new Booking
        {
            HotelId = hotelId,
            UserId = userId, // Associate the booking with the logged-in user
            RoomId = dto.RoomId,
            CheckInDate = dto.CheckInDate,
            CheckOutDate = dto.CheckOutDate
            // Add more properties as needed
        };
        dataContext.Add(booking);
        dataContext.SaveChanges();

        dto.Id = booking.Id;
        return CreatedAtAction(nameof(GetBooking), new { hotelId, bookingId = dto.Id }, dto);
        
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

        // Update booking properties
        booking.CheckInDate = dto.CheckInDate;
        booking.CheckOutDate = dto.CheckOutDate;
        // Update more properties if needed

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
            // only admins can change manager ids anyway
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
