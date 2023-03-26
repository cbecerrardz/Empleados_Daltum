using API_Empleado.DAL.Entidades;
using API_Empleado.DAL.Repositorio;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<ActionResult<Empleados>> AddEmpleado([FromBody] Empleados emp)
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
        public async Task<ActionResult<IEnumerable<Empleados>>> SearchEmpleados(Empleados emp)
        {

            IEnumerable<Empleados> query = await _empleadoContexto.GetAll();
            IEnumerable<Empleados> result;

            if (emp.Estatus != '\0' && char.IsWhiteSpace(emp.Estatus))
            {
                if (emp.Estatus.Equals("A"))
                    query = query.Where(item => item.Fecha_Baja == null);
                else
                    query = query.Where(item => item.Fecha_Baja != null);
            }
            if (!string.IsNullOrEmpty(emp.Nombre))
                query = query.Where(item => item.Nombre == emp.Nombre);

            if (!string.IsNullOrEmpty(emp.RFC))
                query = query.Where(item => item.RFC == emp.RFC);


            if(query.Count() > 0)
            {
                result = query;
                return Ok(result);
            }
            else
            {
                return NotFound(new Empleados());
            }
        }
    }
}
