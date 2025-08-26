using DataAccessLayer.Models.AbstractEntities;

namespace DataAccessLayer.Repository.IRepository.Base;

public interface IGenericRepository<T> where T : BaseEntity
{
    public Task<List<T>> GetAllAsync();
    public Task<T?> GetByIdAsync(int id);
    public Task<T> CreateAsync(T entity);
    public T Update(T entity);
    public void Delete(T entity);
}