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
[Route("api/products")]
public class ProductController : ControllerBase
{
    private readonly IProductService _productSrv;


    public ProductController(IProductService productSrv)
    {
        _productSrv = productSrv;
    }

    [HttpGet]
    public async Task<ActionResult> GetAll()
    {
        try
        {
            var products = await _productSrv.GetAll();

            return Ok(
                new ServiceResponse<List<Product>>()
                {
                    StatusCode = HttpStatusCode.OK,
                    Data = products,
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

    [HttpGet("{id:int}")]
    public async Task<ActionResult> GetById(int id)
    {
        try
        {
            var product = await _productSrv.GetById(id);

            return Ok(
                new ServiceResponse<Product>()
                {
                    StatusCode = HttpStatusCode.OK,
                    Data = product,
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

    [HttpGet("seed")]
    public async Task<ActionResult> Seed()
    {
        try
        {
            var response = await _productSrv.GetSeed();

            return Ok(
                new ServiceResponse<string>()
                {
                    StatusCode = HttpStatusCode.OK,
                    Data = response,
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