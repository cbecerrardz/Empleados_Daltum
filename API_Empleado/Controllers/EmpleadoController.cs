using API_Empleado.DAL.Entidades;
using API_Empleado.DAL.Repositorio;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Data.Entity;
using System.Linq;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace API_Empleado.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpleadoController : Controller
    {
        private readonly IRepositorio<Empleados> _empleadoContexto;

        public EmpleadoController(IRepositorio<Empleados> empleadoContexto)
        {
            _empleadoContexto = empleadoContexto;
        }

        /// <summary>
        /// POST 
        /// </summary>
        /// <param name="emp"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<Empleados>> AddEmpleado(Empleados emp)
        {
            await _empleadoContexto.Insert(emp);
            return Ok(emp);
            //return CreatedAtAction(nameof(GetEmpleado), new { emp.id }, emp);
        }


        /// <summary>
        /// DELETE
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmpleado(int Id)
        {
            var emp = await _empleadoContexto.GetById(Id);
            if (emp == null)
            {
                return NotFound();
            }

            emp.Fecha_Baja = DateTime.Now;
            emp.Estatus = 'B';
            await _empleadoContexto.Update(emp);

            return Ok(emp);
        }

        /// <summary>
        /// GET:
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Empleados>>> GetListaEmpleados()
        {
            var empleados = await _empleadoContexto.GetAll();
            return Ok(empleados);
        }

        /// <summary>
        /// GET by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Empleados>> GetEmpleado(int Id)
        {
            return Ok(await _empleadoContexto.GetById(Id));
        }

        /// <summary>
        /// PUT
        /// </summary>
        /// <param name="id"></param>
        /// <param name="emp"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmpleado(int Id, [FromBody] Empleados emp)
        {
            if (Id != emp.IdEmpleado)
            {
                return BadRequest();
            }

            Empleados empUpdate = await _empleadoContexto.GetById(Id);

            if (empUpdate == null)
            {
                return NotFound();
            }
            empUpdate.Estado_Civil = emp.Estado_Civil;
            empUpdate.Direccion = emp.Direccion;
            empUpdate.Email = emp.Email;
            empUpdate.Telefono = emp.Telefono;
            empUpdate.Puesto = emp.Puesto;
            empUpdate.Fecha_Baja = emp.Fecha_Baja ?? emp.Fecha_Baja;

            return NoContent();
        }


        /// <summary>
        /// POST 
        /// </summary>
        /// <param name="emp"></param>
        /// <returns></returns>
        [HttpPost("Search")]
        public async Task<ActionResult<IEnumerable<Empleados>>> SearchEmpleados([FromBody] Empleados emp)
        {
            if (string.IsNullOrEmpty(emp.Nombre) && string.IsNullOrEmpty(emp.RFC) && emp.RFC.IsNullOrEmpty() && char.IsWhiteSpace(emp.Estatus))
            {
                return NotFound(new Empleados());
            }

            IEnumerable<Empleados> query = await _empleadoContexto.GetAll();

            //var query = _context.Empleados;
            var result = query.Where(e => e.RFC.Contains(emp.RFC));
            return Ok(result);
        }
    }
}
