using System.Text;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Shop_BG_Challenge.DataContext;
using Shop_BG_Challenge.Interfaces;
using Shop_BG_Challenge.Services;

namespace Shop_BG_Challenge;

public class Startup
{
    private readonly IConfiguration _config;

    public Startup(IConfiguration config)
    {
        _config = config;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers().AddJsonOptions(
            x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles
        );

        // Config DbContext
        services.AddDbContext<AppDbContext>(
            options => options.UseSqlServer(_config.GetConnectionString("DefaultConnection"))
        );

        // Cors
        services.AddCors(
            options => options.AddPolicy(
                "AllowWebApp",
                builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()
            )
        );

        // Dependencies Injection
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IProductService, ProductService>();
        services.AddScoped<IPricingService, PricingService>();

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(_config.GetSection("JWT_SECRET_KEY").Value)
                    ),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

        // Swagger
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        // Configure the HTTP request pipeline.
        if (env.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseRouting();

        app.UseAuthentication();

        app.UseAuthorization();

        // Cors
        app.UseCors("AllowWebApp");

        app.UseEndpoints(endpoints => endpoints.MapControllers());
    }
}