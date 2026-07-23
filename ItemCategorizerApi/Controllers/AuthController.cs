using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ItemCategorizerApi.Models;
using ItemCategorizerApi.Dtos;

namespace ItemCategorizerApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
	private readonly UserManager<ApplicationUser> _userManager;
	private readonly IConfiguration _configuration;

	public AuthController(UserManager<ApplicationUser> userManager, IConfiguration configuration)
	{
		_userManager = userManager;
		_configuration = configuration;
	}

	[HttpPost("register")]
	public async Task<IActionResult> Register([FromBody] RegisterDto model)
	{
		/*var userExists = await _userManager.FindByEmailAsync(model.Email);
		if (userExists != null)
			return BadRequest(new AuthResponseDto(false, "", "User already exists."));*/

		ApplicationUser user = new()
		{
			Email = model.Email,
			UserName = model.UserName,
			SecurityStamp = Guid.NewGuid().ToString(),
			FirstName = model.FirstName, 
			LastName = model.LastName, 
			Role= "user"
		};

		// This hashes the password automatically before saving to SQLite
		var result = await _userManager.CreateAsync(user, model.Password);
		if (!result.Succeeded)
		{
			var errors = string.Join(",", result.Errors.Select(e => e.Description));
			return BadRequest(new AuthResponseDto(false, "", $"Registration failed: {errors}"));
		}

		return Ok(new AuthResponseDto(true, "", "User created successfully!"));
	}

	[HttpPost("login")]
	public async Task<IActionResult> Login([FromBody] LoginDto model)
	{
		var user = await _userManager.FindByNameAsync(model.UserName);
		if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
		{
			var token = GenerateJwtToken(user);
			return Ok(new AuthResponseDto(true, token, "Login successful."));
		}
		else if (user == null)
		{
			return Unauthorized(new AuthResponseDto(false, "", "User Not Found!"));
		}
		else if (user!=null && !await _userManager.CheckPasswordAsync(user, model.Password))
		{
            return Unauthorized(new AuthResponseDto(false, "", "Password Wrong!"));
        }
		else
		{
            return Unauthorized(new AuthResponseDto(false, "", "Invalid credentials."));
        }
	}

	private string GenerateJwtToken(ApplicationUser user)
	{
		var authClaims = new List<Claim>
		{
			new(ClaimTypes.NameIdentifier, user.Id),
			new(ClaimTypes.Name, user.UserName),
			new(ClaimTypes.Email, user.Email ?? ""),
			new(ClaimTypes.Role, user.Role),
			new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
		};

		var jwtKey = _configuration["Jwt:Key"] ?? "SUPER_SECRET_KEY_THAT_IS_LONG_ENOUGH_32_BYTES";
		var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));

		var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],       // EKLENEN SATIR
            audience: _configuration["Jwt:Audience"],   // EKLENEN SATIR
            expires: DateTime.UtcNow.AddDays(1),
            claims: authClaims,
            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
        );

		return new JwtSecurityTokenHandler().WriteToken(token);
	}
}