using DataAccessLayer.Models.AbstractEntities;

namespace BusinessLogicLayer.Interfaces.Base
{
    public interface ICrudService<T> where T : BaseEntity
    {
        public Task<IEnumerable<T>> GetAllAsync();
        public Task<T> CreateAsync(T entity);
        public Task UpdateAsync(int id);
        public Task DeleteAsync(int id);
    }
}