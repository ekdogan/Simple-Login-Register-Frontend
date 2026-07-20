using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using ItemCategorizerApi.Models;


namespace ItemCategorizerApi;

public class AppDbContext : IdentityDbContext<ApplicationUser>
{
	public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
	{
	}

	public DbSet<TodoItem> Todos { get; set; }
}

public class TodoItem
{
	public int Id { get; set; }
	public string Title { get; set; } = string.Empty;
	public bool IsCompleted { get; set; }
}