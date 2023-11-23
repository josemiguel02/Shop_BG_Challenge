using System.Collections.Generic;
using System.Threading.Tasks;
using Shop_BG_Challenge.Models;

namespace Shop_BG_Challenge.Interfaces;

public interface IPricingService
{
    public Task<List<Pricing>> GetAll();
}