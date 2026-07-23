using System.Text.Json.Serialization;

namespace ItemCategorizerApi.Dtos;

public class RegisterDto
{
    public string Email { get; set; }

    public string Password { get; set; }
    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string UserName { get; set; }
    public string Role { get; set; }
}

public class LoginDto
{

    public string UserName { get; set; }

    public string Password { get; set; }
}

public record AuthResponseDto(bool Success, string Token, string Message);