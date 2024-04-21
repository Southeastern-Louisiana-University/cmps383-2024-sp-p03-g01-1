using System.Transactions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Selu383.SP24.Api.Features.Authorization;

namespace Selu383.SP24.Api.Controllers;

[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly RoleManager<Role> _roleManager;

    public UsersController(UserManager<User> userManager, RoleManager<Role> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
    }

    [HttpPost("/api/createusers")]
    public async Task<ActionResult<UserDto>> Create(CreateUserDto dto)
    {
        using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        {
            var newUser = new User
            {
                UserName = dto.UserName,
            };

            var createResult = await _userManager.CreateAsync(newUser, dto.Password);
            if (!createResult.Succeeded)
            {
                return BadRequest();
            }

            try
            {
                if (dto.Roles != null && dto.Roles.Any())
                {
                    foreach (var roleName in dto.Roles)
                    {
                        var role = await _roleManager.FindByNameAsync(roleName);
                        if (role != null)
                        {
                            newUser.Roles.Add(new UserRole { Role = role });
                        }
                        else
                        {
                            //Handle role not found
                        }
                    }
                    //Save changes to persist role associations
                    await _userManager.UpdateAsync(newUser);
                }
            }
            catch (InvalidOperationException e) when (e.Message.StartsWith("Role") && e.Message.EndsWith("does not exist."))
            {
                return BadRequest();
            }

            transaction.Complete();

            var userRoleNames = newUser.Roles
                .Select(role => role.Role?.Name)
                .Where(name => name != null)
                .ToArray();

            return Ok(new UserDto
            {
                Id = newUser.Id,
                UserName = newUser.UserName,
                Roles = Array.Empty<string>()
            });
        }
    }


    // GET: /api/users/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<UserDto>> GetUserById(string id)
    {
        var user = await _userManager.FindByIdAsync(id);

        if (user == null)
        {
            return NotFound();
        }
        var isAdmin = await _userManager.IsInRoleAsync(user, RoleNames.Admin);

        var roleNames = isAdmin ? new string[] {RoleNames.Admin } : new string[] {RoleNames.User};

        var userDto = new UserDto
        {
            Id = user.Id,
            UserName = user.UserName ?? "Unknown",
            Roles = roleNames
        };

        return Ok(userDto);
    }
}
