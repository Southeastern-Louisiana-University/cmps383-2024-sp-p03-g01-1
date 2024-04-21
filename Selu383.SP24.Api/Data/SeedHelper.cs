using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Selu383.SP24.Api.Features.Authorization;
using Selu383.SP24.Api.Features.Hotels;
using Selu383.SP24.Api.Features.Rooms;

namespace Selu383.SP24.Api.Data;

public static class SeedHelper
{
    public static async Task MigrateAndSeed(IServiceProvider serviceProvider)
    {
        var dataContext = serviceProvider.GetRequiredService<DataContext>();

        await dataContext.Database.MigrateAsync();

        await AddRoles(serviceProvider);
        await AddUsers(serviceProvider);
        await AddHotels(dataContext);
        await AddRooms(dataContext);
    }

    private static async Task AddUsers(IServiceProvider serviceProvider)
    {
        const string defaultPassword = "Password123!";
        var userManager = serviceProvider.GetRequiredService<UserManager<User>>();

        if (userManager.Users.Any())
        {
            return;
        }

        var adminUser = new User
        {
            UserName = "galkadi"
        };
        await userManager.CreateAsync(adminUser, defaultPassword);
        await userManager.AddToRoleAsync(adminUser, RoleNames.Admin);

        var bob = new User
        {
            UserName = "bob"
        };
        await userManager.CreateAsync(bob, defaultPassword);
        await userManager.AddToRoleAsync(bob, RoleNames.User);

        var sue = new User
        {
            UserName = "sue"
        };
        await userManager.CreateAsync(sue, defaultPassword);
        await userManager.AddToRoleAsync(sue, RoleNames.User);
    }

    private static async Task AddRoles(IServiceProvider serviceProvider)
    {
        var roleManager = serviceProvider.GetRequiredService<RoleManager<Role>>();
        if (roleManager.Roles.Any())
        {
            return;
        }
        await roleManager.CreateAsync(new Role
        {
            Name = RoleNames.Admin
        });

        await roleManager.CreateAsync(new Role
        {
            Name = RoleNames.User
        });
    }

    private static async Task AddHotels(DataContext dataContext)
    {
        var hotels = dataContext.Set<Hotel>();

        if (await hotels.AnyAsync())
        {
            return;
        }


        dataContext.Set<Hotel>().AddRange(
         [
            new Hotel
            {
                Name = "Baton Rouge",
                Address = "200 Convention St.",
                City = "Baton Rouge",
                State = "LA",
                PostalCode = "70801"
            },
             new Hotel
             {
                 Name = "French Quarter",
                 Address = "225 Barrone St.",
                 City = "New Orleans",
                 State = "LA",
                 PostalCode = "70112"
             },
             new Hotel
             {
                 Name = "Jackson Square",
                 Address = "405 Esplanade Ave.",
                 City = "New Orleans",
                 State = "LA",
                 PostalCode = "70116"
             }
        ]);


        await dataContext.SaveChangesAsync();




    }

    private static async Task AddRooms(DataContext dataContext)
    {
        var rooms = dataContext.Set<Room>();

        // Retrieve hotel IDs
        var hotelIds = await dataContext.Set<Hotel>().Select(h => h.Id).ToListAsync();

        // Add rooms to each hotel
        foreach (var hotelId in hotelIds)
        {
            // Clear existing rooms for the current hotel
            var existingRooms = await rooms.Where(r => r.HotelId == hotelId).ToListAsync();
            dataContext.RemoveRange(existingRooms);

            // Add new rooms
            rooms.AddRange(
                new List<Room>
                {
                new Room
                {
                    Type = "Single",
                    Capacity = 1,
                    Amenities = new List<string> { "Complimentary Wi-fi", "Coffee Maker", "Work Desk" },
                    Price = 100.00m,
                    Available = true,
                    HotelId = hotelId
                },
                new Room
                {
                    Type = "Double",
                    Capacity = 2,
                    Amenities = new List<string> { "Complimentary Breakfast", "Access to Fitness Center", "In-room Safe" },
                    Price = 150.00m,
                    Available = true,
                    HotelId = hotelId
                },
                new Room
                {
                    Type = "Suite",
                    Capacity = 4,
                    Amenities = new List<string> { "Private Balcony", "Mini Refrigerator", "Jacuzzi Tub" },
                    Price = 250.00m,
                    Available = true,
                    HotelId = hotelId
                }
                }
            );
        }

        await dataContext.SaveChangesAsync();
    }

}