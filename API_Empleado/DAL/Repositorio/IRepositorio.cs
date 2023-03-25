using System.Linq.Expressions;

namespace API_Empleado.DAL.Repositorio
{
    public interface IRepositorio<TEntity> where TEntity : class
    {
        Task<IEnumerable<TEntity>> GetAll();

        Task<TEntity> GetById(int id);

        Task<TEntity> Insert(TEntity entity);

        Task Update(TEntity entity);

        Task<TEntity> Delete(int id);

        Task<TEntity> FindBy(Expression<Func<TEntity, bool>> expression);

        //  Task<PaginacionEntity<TDocument>> paginationBy
        //  (
        //      Expression<Func<TDocument, bool>> filterExpression,
        //      PaginacionEntity<TDocument> pagination
        //  );
        //  Task<PaginacionEntity<TDocument>> paginationByFilter
        //(
        //    PaginacionEntity<TDocument> pagination
        //);
    }
}
