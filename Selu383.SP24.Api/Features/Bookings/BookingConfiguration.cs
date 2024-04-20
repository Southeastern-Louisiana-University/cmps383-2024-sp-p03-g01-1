using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Selu383.SP24.Api.Features.Bookings;

namespace Selu383.SP24.Api.Data.Configurations
{
    public class BookingConfiguration : IEntityTypeConfiguration<Booking>
    {
        public void Configure(EntityTypeBuilder<Booking> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(b => b.RoomId).IsRequired();
            builder.HasOne(b => b.Room)
                .WithMany()
                .HasForeignKey(b => b.RoomId);
        }
    }
}
