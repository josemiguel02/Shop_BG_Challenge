using System.Threading.Tasks;
using Shop_BG_Challenge.DTO;
using Shop_BG_Challenge.Helpers;
using Shop_BG_Challenge.Models;

namespace Shop_BG_Challenge.Interfaces;

public interface IAuthService
{
    public Task<LoginResponse> Login(UserDTO user);
    public Task<LoginResponse> Register(UserDTO user);
    protected string HashPassword(string plainPassword);
    protected bool VerifyPassword(string plainPassword, string hashedPassword);
    protected string GenerateJwtToken(User user);
}