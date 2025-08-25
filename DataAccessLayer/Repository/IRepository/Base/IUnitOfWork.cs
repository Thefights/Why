using DataAccessLayer.Models.AbstractEntities;

namespace DataAccessLayer.Repository.IRepository.Base
{
    public interface IUnitOfWork
    {
        public Task<int> SaveChangesAsync();
        IGenericRepository<T> Repository<T>() where T : BaseEntity;
    }
}