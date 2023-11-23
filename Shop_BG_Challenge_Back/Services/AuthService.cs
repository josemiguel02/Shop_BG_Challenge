using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Shop_BG_Challenge.DataContext;
using Shop_BG_Challenge.DTO;
using Shop_BG_Challenge.Exceptions;
using Shop_BG_Challenge.Helpers;
using Shop_BG_Challenge.Interfaces;
using Shop_BG_Challenge.Models;

namespace Shop_BG_Challenge.Services;

public class AuthService : IAuthService
{
    private readonly AppDbContext _dbContext;
    private readonly IConfiguration _config;

    public AuthService(AppDbContext dbContext, IConfiguration config)
    {
        _dbContext = dbContext;
        _config = config;
    }

    public async Task<LoginResponse> Login(UserDTO user)
    {
        // Get user
        var existsUser = await _dbContext.Users.FirstOrDefaultAsync(
            u => u.Email.Equals(user.Email)
        );

        if (existsUser == null)
        {
            throw new ServiceException("User not registered with this username");
        }

        // Compare password
        var matchedPassword = VerifyPassword(user.Password, existsUser.Password);

        if (!matchedPassword)
        {
            throw new ServiceException("Username and/or password invalid");
        }

        // Generate token
        var jwtToken = GenerateJwtToken(existsUser);
        var userResponse = new UserResponse()
        {
            Id = existsUser.Id,
            Email = existsUser.Email,
            PricingId = existsUser.PricingId
        };

        return new LoginResponse()
        {
            Token = jwtToken,
            User = userResponse
        };
    }

    public async Task<LoginResponse> Register(UserDTO user)
    {
        var existsUser = await _dbContext.Users.FirstOrDefaultAsync(
            u => u.Email.Equals(user.Email)
        );

        if (existsUser != null)
        {
            throw new ServiceException("User is already registered");
        }

        // Create New User
        var newUser = new User()
        {
            Email = user.Email,
            Password = HashPassword(user.Password),
            PricingId = 1
        };

        _dbContext.Users.Add(newUser);

        await _dbContext.SaveChangesAsync();

        // Generate Token
        var jwtToken = GenerateJwtToken(newUser);

        var userResponse = new UserResponse()
        {
            Id = newUser.Id,
            Email = newUser.Email,
            PricingId = newUser.PricingId,
        };

        return new LoginResponse()
        {
            Token = jwtToken,
            User = userResponse
        };
    }

    public string HashPassword(string plainPassword)
    {
        var salt = BCrypt.Net.BCrypt.GenerateSalt(10);
        return BCrypt.Net.BCrypt.HashPassword(plainPassword, salt);
    }

    public bool VerifyPassword(string plainPassword, string hashedPassword)
    {
        return BCrypt.Net.BCrypt.Verify(plainPassword, hashedPassword);
    }

    public string GenerateJwtToken(User user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email)
        };

        var secretKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_config.GetSection("JWT_SECRET_KEY").Value)
        );

        var credentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha512Signature);

        var securityToken = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddDays(4),
            signingCredentials: credentials
        );

        var jwtToken = new JwtSecurityTokenHandler().WriteToken(securityToken);

        return jwtToken;
    }
}