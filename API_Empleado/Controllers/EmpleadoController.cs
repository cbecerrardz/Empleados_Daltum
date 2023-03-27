using API_Empleado.DAL.Entidades;
using API_Empleado.DAL.Repositorio;
using Empleado_Daltum.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net;

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
            try {
                emp.Fecha_Alta = DateTime.Now;
                emp.Estatus = 'A';
                var empleados = await _empleadoContexto.GetAll();
                if (empleados.Any(x => x.RFC == emp.RFC))
                {
                    return BadRequest(new
                    {
                        Succeeded = false,
                        Message = "El RFC ya existe!!!"
                    });
                }
                else
                {
                    var result = await _empleadoContexto.Insert(emp);
                    return Ok(emp);
                }
            }
            catch (Exception ex)
            {
                return Json(ex);
            }

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
        public async Task<IActionResult> UpdateEmpleado(int Id,  Empleados emp)
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
            await _empleadoContexto.Update(empUpdate);
            return Ok();
        }


        /// <summary>
        /// POST 
        /// </summary>
        /// <param name="emp"></param>
        /// <returns></returns>
        [HttpPost("Busqueda")]
        public async Task<ActionResult<IEnumerable<Empleados>>> SearchEmpleados([FromBody] EmpleadoB emp)
        {

            IEnumerable<Empleados> query = await _empleadoContexto.GetAll();
            IEnumerable<Empleados> result;

            if (!string.IsNullOrEmpty(emp.Estatus))
            {
                if (emp.Estatus.Equals("A"))
                    query = query.Where(item => item.Fecha_Baja == null);
                else
                    query = query.Where(item => item.Fecha_Baja != null);
            }
            if (!string.IsNullOrEmpty(emp.Nombre))
                query = query.Where(item => item.Nombre.ToLower().Contains(emp.Nombre.ToLower()));

            if (!string.IsNullOrEmpty(emp.RFC))
                query = query.Where(item => item.RFC.ToLower().Contains(emp.RFC.ToLower()));


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
