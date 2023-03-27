using System.ComponentModel.DataAnnotations;

namespace API_Empleado.DAL.Entidades
{
    public class Empleados
    {
        [Key]
        public int IdEmpleado { get; set; }
        public string Nombre { get; set; }
        public string Apellido_Paterno { get; set; }

        public string? Apellido_Materno { get; set; }
        public byte Edad { get; set; }
        public DateTime Fecha_Nacimiento { get; set; }
        public string Genero { get; set; }
        public string Estado_Civil { get; set; }
        public string? RFC { get; set; }
        public string Direccion { get; set; }
        public string Email { get; set; }
        public string Telefono { get; set; }
        public string Puesto { get; set; }

        public DateTime Fecha_Alta { get; set; }

        public DateTime? Fecha_Baja { get; set; }

        public byte IdGenero { get; set; }
        public int IdEdoCivil { get; set; }

        public char Estatus { get; set; }
    }
}
