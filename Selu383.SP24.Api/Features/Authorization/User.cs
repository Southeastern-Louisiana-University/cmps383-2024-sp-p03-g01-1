using Microsoft.AspNetCore.Identity;
using Selu383.SP24.Api.Features.Hotels;
using Selu383.SP24.Api.Features.Bookings;

namespace Selu383.SP24.Api.Features.Authorization;

public class User : IdentityUser<int>
{
    public virtual ICollection<UserRole> Roles { get; set; } = new List<UserRole>();
    public virtual ICollection<Hotel> Hotels { get; set; } = new List<Hotel>();
    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();

}
