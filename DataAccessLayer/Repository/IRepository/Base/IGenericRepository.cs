using DataAccessLayer.Models.AbstractEntities;
using System.Linq.Expressions;

namespace DataAccessLayer.Repository.IRepository.Base;

public interface IGenericRepository<T> where T : BaseEntity
{
    public Task<List<T>> GetAllAsync(string[]? _include = null);
    public Task<T?> GetByIdAsync(int id, string[]? _include = null);
    public Task<T?> GetByCondition(Expression<Func<T, bool>> predicate, string[]? _include = null);
    public Task<T> CreateAsync(T entity);
    public T Update(T entity);
    public void Delete(T entity);
}