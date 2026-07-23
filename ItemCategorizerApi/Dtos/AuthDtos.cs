using System.Text.Json.Serialization;

namespace ItemCategorizerApi.Dtos;

public class RegisterDto
{
    [JsonPropertyName("email")]
    public string Email { get; set; }

    [JsonPropertyName("password")]
    public string Password { get; set; }

    [JsonPropertyName("firstName")]
    public string FirstName { get; set; }

    [JsonPropertyName("lastName")]
    public string LastName { get; set; }

    [JsonPropertyName("userName")]
    public string UserName { get; set; }
}

public class LoginDto
{
    [JsonPropertyName("userName")]
    public string UserName { get; set; }

    [JsonPropertyName("password")]
    public string Password { get; set; }
}

public record AuthResponseDto(bool Success, string Token, string Message);