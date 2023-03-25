using API_Empleado.DAL.Core;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Linq.Expressions;

namespace API_Empleado.DAL.Repositorio
{
    public class Repositorio<TEntity> : IRepositorio<TEntity> where TEntity : class
    {
        protected AppContexts _context;
        public Repositorio(AppContexts context)
        {
            _context = context;
        }
        protected DbSet<TEntity> EntitySet { 
         
            get
            {
                return _context.Set<TEntity>();
            }
        }

        /// <summary>
        /// Eliminar Registro
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<TEntity> Delete(int id)
        {
            TEntity entity = await EntitySet.FindAsync(id);
            EntitySet.Remove(entity);
            await Save();
            return entity;
        }

        public async Task<TEntity> FindBy(Expression<Func<TEntity, bool>> expression)
        {
            //return await EntitySet.Where(expression).ToListAsync();
            return await EntitySet.AsNoTracking().FirstOrDefaultAsync(expression);
        }

        /// <summary>
        /// Obtener todo los registros
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<TEntity>> GetAll()
        {
            return await EntitySet.ToListAsync();
        }

        /// <summary>
        /// Obtener registro por id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<TEntity> GetById(int id)
        {
            return await EntitySet.FindAsync(id);
        }

        /// <summary>
        /// Alta de Registro
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public async Task<TEntity> Insert(TEntity entity)
        {
           EntitySet.Add(entity);
           await Save();
           return entity;
        }

        /// <summary>
        /// Actualizar registro
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public async Task Update(TEntity entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            await Save();
        }

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed) {
             if(disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }
    }
}
