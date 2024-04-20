using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Selu383.SP24.Api.Data;
using Selu383.SP24.Api.Extensions;
using Selu383.SP24.Api.Features.Authorization;
using Selu383.SP24.Api.Features.Rooms;
using Selu383.SP24.Api.Features.Hotels;


namespace Selu383.SP24.Api.Controllers;

    [Route("api/rooms")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        private readonly DbSet<Room> _rooms;
        private readonly DataContext _dataContext;

        public RoomsController(DataContext dataContext)
        {
            this._dataContext = dataContext;
            _rooms = dataContext.Set<Room>();
        }

        [HttpGet]
        public IQueryable<RoomDto> GetAllRooms()
        {
            return GetRoomDtos(_rooms);
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<RoomDto> GetRoomById(int id)
        {
            var result = GetRoomDtos(_rooms.Where(x => x.Id == id)).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

    

    [HttpPost]
        [Authorize(Roles = RoleNames.Admin)]
        public ActionResult<RoomDto> CreateRoom(RoomDto dto)
        {
            if (IsInvalid(dto))
            {
                return BadRequest();
            }

            var room = new Room
            {
                Type = dto.Type,
                Capacity = dto.Capacity,
                Amenities = dto.Amenities,
                Price = dto.Price,
                Available = dto.Available,
                HotelId = dto.HotelId
            };
            _rooms.Add(room);

            _dataContext.SaveChanges();

            dto.Id = room.Id;

            return CreatedAtAction(nameof(GetRoomById), new { id = dto.Id }, dto);
        }

        [HttpPut]
        [Route("{id}")]
        [Authorize]
        public ActionResult<RoomDto> UpdateRoom(int id, RoomDto dto)
        {
            if (IsInvalid(dto))
            {
                return BadRequest();
            }

            var room = _rooms.FirstOrDefault(x => x.Id == id);
            if (room == null)
            {
                return NotFound();
            }

            room.Type = dto.Type;
            room.Capacity = dto.Capacity;
            room.Amenities = dto.Amenities;
            room.Price = dto.Price;
            room.Available = dto.Available;
            room.HotelId = dto.HotelId;


            _dataContext.SaveChanges();

            dto.Id = room.Id;

            return Ok(dto);
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        public ActionResult DeleteRoom(int id)
        {
            var room = _rooms.FirstOrDefault(x => x.Id == id);
            if (room == null)
            {
                return NotFound();
            }

            _rooms.Remove(room);

            _dataContext.SaveChanges();

            return Ok();
        }

        private bool IsInvalid(RoomDto dto)
        {
            return false;
        }

        private static IQueryable<RoomDto> GetRoomDtos(IQueryable<Room> rooms)
        {
            return rooms
                .Select(x => new RoomDto
                {
                    Id = x.Id,
                    Type = x.Type,
                    Capacity = x.Capacity,
                    Amenities = x.Amenities,
                    Price = x.Price,
                    Available = x.Available,
                    HotelId = x.HotelId

                });
        }
    }

