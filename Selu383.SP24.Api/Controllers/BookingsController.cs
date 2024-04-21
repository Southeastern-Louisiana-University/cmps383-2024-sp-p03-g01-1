using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Selu383.SP24.Api.Features.Bookings
{
    [Route("api/bookings")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private static readonly List<BookingDto> _bookings = new List<BookingDto>
        {
            new BookingDto { Id = 1, HotelId = 1,  RoomId= 1, CheckInDate = new DateTime(2024, 4, 20), CheckOutDate = new DateTime(2024, 4, 25) },
            new BookingDto { Id = 2, HotelId = 2, RoomId = 2, CheckInDate = new DateTime(2024, 5, 1), CheckOutDate = new DateTime(2024, 5, 5) }
        };

        [HttpGet]
        public ActionResult<IEnumerable<BookingDto>> Get()
        {
            return Ok(_bookings);
        }

        [HttpGet("{id}")]
        public ActionResult<BookingDto> GetById(int id)
        {
            var booking = _bookings.FirstOrDefault(b => b.Id == id);
            if (booking == null)
            {
                return NotFound();
            }
            return Ok(booking);
        }
    }
}
