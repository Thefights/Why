using BusinessLogicLayer.DTO.UserDTO;
using DataAccessLayer.Models.UserEntities;

namespace BusinessLogicLayer.Interfaces.Services
{
    public interface IAuthService
    {
        public Task<User> RegisterAsync(string email, string password);
        public Task<AuthUserRespondDTO> AuthenticateAsync(string email, string password, string ipAddress);
    }
}
