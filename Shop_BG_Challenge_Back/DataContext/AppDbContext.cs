using Microsoft.EntityFrameworkCore;
using Shop_BG_Challenge.Models;

namespace Shop_BG_Challenge.DataContext;

public class AppDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Pricing> Pricings { get; set; }

    public AppDbContext(DbContextOptions options) : base(options)
    {
    }
}