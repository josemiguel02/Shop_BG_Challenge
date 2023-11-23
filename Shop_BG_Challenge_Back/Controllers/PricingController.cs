using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Shop_BG_Challenge.Exceptions;
using Shop_BG_Challenge.Helpers;
using Shop_BG_Challenge.Interfaces;
using Shop_BG_Challenge.Models;

namespace Shop_BG_Challenge.Controllers;

[ApiController]
[Route("api/pricings")]
public class PricingController : ControllerBase
{
    private readonly IPricingService _pricingSrv;

    public PricingController(IPricingService pricingSrv)
    {
        _pricingSrv = pricingSrv;
    }

    [HttpGet]
    public async Task<ActionResult> GetAll()
    {
        try
        {
            var pricings = await _pricingSrv.GetAll();

            return Ok(
                new ServiceResponse<List<Pricing>>()
                {
                    StatusCode = HttpStatusCode.OK,
                    Data = pricings,
                    Message = "Process carried out successfully!",
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