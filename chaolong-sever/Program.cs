using BusinessLogicLayer.Helpers;
using chaolong_sever.Authorization;
using chaolong_sever.Extenstions;
using DataAccessLayer.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()
     .AddJsonOptions(options =>
     {
         options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
         //Ignore object cycle
         options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
     });

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("ChaoLongCoTham"));
    options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
});

builder.Services.AddSwaggerGen(c =>
{
    c.ExampleFilters();
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Chao Long API", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        Description = "Nhập token theo dạng: Bearer {token}"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
});
});

builder.Services.AddAWSService(builder.Configuration);
builder.Services.AddExampleService(builder.Configuration);
builder.Services.AddScopeService();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.Configure<AppSettings>(
    builder.Configuration.GetSection("AppSettings"));


var app = builder.Build();
var secret = app.Configuration["AppSettings:Secret"];

app.UseMiddleware<JwtMiddleware>();
app.UseMiddleware<ErrorHandlerMiddleware>();

app.UseHttpsRedirection();


app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Chao Long API v1");
    c.RoutePrefix = "swagger";

});


app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();

app.Run();