using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Shop_BG_Challenge.DataContext;
using Shop_BG_Challenge.Exceptions;
using Shop_BG_Challenge.Interfaces;
using Shop_BG_Challenge.Models;

namespace Shop_BG_Challenge.Services;

public class ProductService : IProductService
{
    private readonly AppDbContext _dbContext;

    public ProductService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }


    public async Task<List<Product>> GetAll()
    {
        return await _dbContext.Products.ToListAsync();
    }

    public async Task<Product> GetById(int id)
    {
        var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.Id == id);

        if (product == null)
        {
            throw new ServiceException($"Product not exists with Id: {id}");
        }

        return product;
    }

    public async Task<string> GetSeed()
    {
        var basePath = Environment.CurrentDirectory;
        var seedPath = Path.Join(basePath, "Seed", "ProductsSeed.json");

        if (!File.Exists(seedPath))
        {
            throw new ServiceException("Products seed not exists");
        }

        var seedJson = File.ReadAllText(seedPath);

        var seedDeserialized = JsonSerializer.Deserialize<List<Product>>(seedJson);

        if (seedDeserialized == null)
        {
            throw new ServiceException("Products seed not available");
        }

        foreach (var product in seedDeserialized)
        {
            _dbContext.Products.Add(product);
        }

        await _dbContext.SaveChangesAsync();

        return "Products Seeding";
    }
}