using DataAccessLayer.Data;
using DataAccessLayer.Models.AbstractEntities;
using DataAccessLayer.Repository.IRepository.Base;

namespace DataAccessLayer.Repository.Base
{
    public class UnitOfWork(ApplicationDbContext _dbContext) : IUnitOfWork
    {
        private readonly Dictionary<Type, dynamic> _repositories = [];

        public IGenericRepository<T> Repository<T>() where T : BaseEntity
        {
            var entityType = typeof(T);
            if (_repositories.TryGetValue(entityType, out dynamic? repository))
            {
                return repository;
            }

            var newRepository = Activator.CreateInstance(typeof(GenericRepository<>).MakeGenericType(typeof(T)), _dbContext);

            if (newRepository == null)
                throw new NullReferenceException("Repository should not be null");

            _repositories.Add(entityType, newRepository);

            return (IGenericRepository<T>)newRepository;
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _dbContext.SaveChangesAsync();
        }
    }
}