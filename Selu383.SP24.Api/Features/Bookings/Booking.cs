using Selu383.SP24.Api.Features.Rooms;
using Selu383.SP24.Api.Features.Hotels;
using Selu383.SP24.Api.Features.Authorization;

using System;

namespace Selu383.SP24.Api.Features.Bookings
{
    public class Booking
    {
        public int Id { get; set; }
        public int HotelId { get; set; }
        public int UserId { get; set; }
        public int RoomId { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public virtual Room? Room { get; set; }
        public virtual Hotel? Hotel { get; set; }
        public virtual User? User { get; set; }


    }
}
