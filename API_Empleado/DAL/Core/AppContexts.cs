using API_Empleado.DAL.Entidades;
using Microsoft.EntityFrameworkCore;

namespace API_Empleado.DAL.Core
{
    public class AppContexts : DbContext
    {
        public AppContexts(DbContextOptions<AppContexts> options) : base(options)
        {
        }
        public DbSet<Empleados> Empleados { get; set; }
    }

}


