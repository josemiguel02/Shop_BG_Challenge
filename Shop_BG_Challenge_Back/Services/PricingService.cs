using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Shop_BG_Challenge.DataContext;
using Shop_BG_Challenge.Interfaces;
using Shop_BG_Challenge.Models;

namespace Shop_BG_Challenge.Services;

public class PricingService : IPricingService
{
    private readonly AppDbContext _dbContext;


    public PricingService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }


    public async Task<List<Pricing>> GetAll()
    {
        var pricings = await _dbContext.Pricings.ToListAsync();

        return pricings;
    }
}