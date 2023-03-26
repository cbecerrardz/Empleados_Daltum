using API_Empleado.DAL.Core;
using API_Empleado.DAL.Repositorio;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppContexts>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("WebApiDatabase"), providerOptions => providerOptions.EnableRetryOnFailure()));
builder.Services.AddScoped(typeof(IRepositorio<>), typeof(Repositorio<>));

builder.Services.AddCors(opt => opt.AddPolicy("CorsRule", rule =>
{
    rule.AllowAnyHeader().AllowAnyMethod().WithOrigins("*");
}));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.UseCors("CorsRule");
app.UseCors( options => options
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader()
  );
app.MapControllers();

app.Run();
