using DataAccessLayer.Models.UserEntities;

namespace BusinessLogicLayer.Interfaces.Services
{
    public interface IUserService
    {
        public Task<User> GetUserById(int id);
    }
}