using System.Collections.Generic;
using System.Threading.Tasks;
using Shop_BG_Challenge.Models;

namespace Shop_BG_Challenge.Interfaces;

public interface IProductService
{
    public Task<List<Product>> GetAll();
    public Task<Product> GetById(int id);
    public Task<string> GetSeed();
}