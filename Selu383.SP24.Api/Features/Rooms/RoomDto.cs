namespace Selu383.SP24.Api.Features.Rooms
{
    public class RoomDto
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public int Capacity { get; set; }
        public List<string> Amenities { get; set; }
        public decimal Price { get; set; }
        public bool Available { get; set; }
        public int HotelId { get; set; }

    }
}
