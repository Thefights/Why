using BusinessLogicLayer.DTO.Abstract.Base;
using DataAccessLayer.Enums;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BusinessLogicLayer.DTO.UserDTO
{
    public class AuthUserRequestDTO : BaseDTO
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        [Phone(ErrorMessage = "Invalid Phone Number")]
        public string Phone { get; set; } = string.Empty;

        [Required]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        [JsonIgnore]
        public UserRoleEnum Role { get; set; } = UserRoleEnum.Customer;
    }
}