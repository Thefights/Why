using DataAccessLayer.Data;
using DataAccessLayer.Models.AbstractEntities;
using DataAccessLayer.Repository.IRepository.Base;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Repository.Base
{
    public class GenericRepository<T>(ApplicationDbContext _dbContext)
    : IGenericRepository<T>
       where T : BaseEntity
    {
        public async Task<List<T>> GetAllAsync()
        {
            return await _dbContext.Set<T>().ToListAsync();
        }

        public async Task<T?> GetByIdAsync(int id)
        {
            return await _dbContext.Set<T>().FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<T> GetByCondition(Func<T, bool> predicate)
        {
            var entity = await _dbContext.Set<T>().FirstOrDefaultAsync(e => predicate(e));
            if (entity == null)
            {
                throw new KeyNotFoundException("Entity not found.");
            }
            return entity;
        }

        public async Task<T> CreateAsync(T entity)
        {
            await _dbContext.Set<T>().AddAsync(entity);
            return entity;
        }

        public T Update(T entity)
        {
            var result = _dbContext.Set<T>().Update(entity);
            return result.Entity;
        }

        public void Delete(T entity)
        {
            _dbContext.Set<T>().Remove(entity);
        }
    }
}