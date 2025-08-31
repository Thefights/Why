using BusinessLogicLayer.Interfaces.Services;
using DataAccessLayer.Models.UserEntities;
using DataAccessLayer.Repository.IRepository.Base;

namespace BusinessLogicLayer.Implements.Services
{
    public class UserService(IUnitOfWork _unitOfWork) : IUserService
    {
        public interface IUserService
        {
            public Task<User> GetUserById(int id);
        }

        public async Task<User> GetUserById(int id)
        {
            return await _unitOfWork.Repository<User>().GetByIdAsync(id);
        }
    }
}