using Selu383.SP24.Api.Features.Hotels;
using Selu383.SP24.Api.Features.Bookings;

namespace Selu383.SP24.Api.Features.Rooms
{
    public class Room
    {
        public int Id { get; set; }
        public string? Type { get; set; }
        public int Capacity { get; set; }
        public List<string>? Amenities { get; set; }
        public decimal Price { get; set; }
        public bool Available { get; set; }
        public int HotelId { get; set; } 
        public Hotel? Hotel { get; set; }
        public List<Booking>? Bookings { get; set; }


    }
}

//public int RoomId { get; set; }
