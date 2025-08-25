using BusinessLogicLayer.Interfaces.Base;
using DataAccessLayer.Models.AbstractEntities;
using DataAccessLayer.Repository.IRepository.Base;

namespace BusinessLogicLayer.Implements.Base
{
    public class CrudService<T>(IUnitOfWork _unitOfWork) : ICrudService<T> where T : BaseEntity
    {
        public async Task<T?> GetByIdAsync(int id)
        {
            return await _unitOfWork.Repository<T>().GetByIdAsync(id);
        }
        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _unitOfWork.Repository<T>().GetAllAsync();
        }
        public async Task<T> CreateAsync(T entity)
        {
            await _unitOfWork.Repository<T>().CreateAsync(entity);
            await _unitOfWork.SaveChangesAsync();
            return entity;
        }
        public async Task UpdateAsync(int id)
        {
            await _unitOfWork.Repository<T>().UpdateAsync(id);
            await _unitOfWork.SaveChangesAsync();
        }
        public async Task DeleteAsync(int id)
        {
            await _unitOfWork.Repository<T>().DeleteAsync(id);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}