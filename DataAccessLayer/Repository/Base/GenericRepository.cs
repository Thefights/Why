using DataAccessLayer.Data;
using DataAccessLayer.Models.AbstractEntities;
using DataAccessLayer.Repository.IRepository.Base;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace DataAccessLayer.Repository.Base
{
    public class GenericRepository<T>(ApplicationDbContext _dbContext)
    : IGenericRepository<T>
       where T : BaseEntity
    {
        public async Task<List<T>> GetAllAsync(string[]? _include)
        {
            return await ApplyIncludes(_dbContext.Set<T>(), _include).ToListAsync();
        }

        public async Task<T?> GetByIdAsync(int id, string[]? _include)
        {
            return await ApplyIncludes(_dbContext.Set<T>(), _include).FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<T> GetByCondition(Expression<Func<T, bool>> predicate, string[]? _include)
        {
            var entity = await ApplyIncludes(_dbContext.Set<T>(), _include).FirstOrDefaultAsync(predicate);
            //if (entity == null)
            //{
            //    throw new KeyNotFoundException("Entity not found.");
            //}
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

        public void DeleteRange(IEnumerable<T> entities)
        {
            _dbContext.Set<T>().RemoveRange(entities);
        }

        private IQueryable<T> ApplyIncludes(IQueryable<T> query, string[]? _includes)
        {
            if (_includes != null)
            {
                foreach (var include in _includes)
                {
                    query = query.Include(include);
                }
            }
            return query;
        }
    }
}