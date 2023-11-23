using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Shop_BG_Challenge.DTO;
using Shop_BG_Challenge.Exceptions;
using Shop_BG_Challenge.Helpers;
using Shop_BG_Challenge.Interfaces;

namespace Shop_BG_Challenge.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<ActionResult> Login(UserDTO userDto)
    {
        try
        {
            var response = await _authService.Login(userDto);

            return Ok(
                new ServiceResponse<UserResponse>()
                {
                    StatusCode = HttpStatusCode.OK,
                    Data = response.User,
                    Message = "Login successfully!",
                    Token = response.Token
                }
            );
        }

        catch (Exception e) when (e is ServiceException)
        {
            return BadRequest(
                new ServiceResponse<string?>()
                {
                    StatusCode = HttpStatusCode.BadRequest,
                    Data = null,
                    Message = e is ServiceException ? e.Message : "Something went wrong"
                }
            );
        }
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register(UserDTO userDto)
    {
        try
        {
            var response = await _authService.Register(userDto);

            return Ok(
                new ServiceResponse<UserResponse>()
                {
                    StatusCode = HttpStatusCode.OK,
                    Data = response.User,
                    Message = "Register successfully!",
                    Token = response.Token
                }
            );
        }
        catch (Exception e) when (e is ServiceException)
        {
            return BadRequest(
                new ServiceResponse<string?>()
                {
                    StatusCode = HttpStatusCode.BadRequest,
                    Data = null,
                    Message = e is ServiceException ? e.Message : "Something went wrong"
                }
            );
        }
    }
}