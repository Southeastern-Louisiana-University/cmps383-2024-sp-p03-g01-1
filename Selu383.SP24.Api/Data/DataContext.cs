﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Selu383.SP24.Api.Features.Authorization;
using Selu383.SP24.Api.Features.Rooms;

namespace Selu383.SP24.Api.Data;

public class DataContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }

    public DataContext()
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(DataContext).Assembly);

        modelBuilder.Entity<Room>()
            .Property(r => r.Price)
            .HasColumnType("decimal(10,2)");
    }
}
