using chaolong_sever.Extenstions;
using DataAccessLayer.Data;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Filters;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("ChaoLongCoTham"));
    options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
});

builder.Services.AddSwaggerGen(c =>
{
    c.ExampleFilters();
});

//builder.Services.AddDefaultAWSOptions(builder.Configuration.GetAWSOptions());
//builder.Services.AddAWSService<IAmazonS3>();
builder.Services.AddAWSService(builder.Configuration);
builder.Services.AddExampleService(builder.Configuration);
builder.Services.AddScopeService();


var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Chao Long API v1");
    c.RoutePrefix = "swagger";

});


app.UseAuthorization();

app.MapControllers();

app.Run();