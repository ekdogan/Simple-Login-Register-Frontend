using Microsoft.AspNetCore.Identity;

namespace ItemCategorizerApi.Models;

public class ApplicationUser : IdentityUser
{
	// Custom properties can go here (e.g., public string FirstName { get; set; })
	public string FirstName { get; set; }
	public string LastName { get; set; }
	public string UserName { get; set; }
	public string Email {  get; set; }

}