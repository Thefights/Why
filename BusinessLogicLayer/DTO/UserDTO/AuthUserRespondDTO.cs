using BusinessLogicLayer.DTO.Abstract.Base;
using DataAccessLayer.Models.UserEntities;

namespace BusinessLogicLayer.DTO.UserDTO
{
    public class AuthUserRespondDTO : BaseWithIdDTO
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;

        public string AccessToken { get; set; } = string.Empty;

        public AuthUserRespondDTO(User user, string jwtToken)
        {
            Id = user.Id;
            Email = user.Email;
            Name = user.Name;
            AccessToken = jwtToken;
        }
    }
}