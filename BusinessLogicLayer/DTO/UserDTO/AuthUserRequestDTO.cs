using BusinessLogicLayer.DTO.Abstract.Base;
using DataAccessLayer.Enums;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BusinessLogicLayer.DTO.UserDTO
{
    public class AuthUserRequestDTO : BaseDTO
    {
        [Required]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "{0} must be between {2} and {1} characters long.")]
        public string Name { get; set; } = string.Empty;

        [Required]
        [Phone(ErrorMessage = "Invalid {0}")]
        public string Phone { get; set; } = string.Empty;

        [Required]
        [EmailAddress(ErrorMessage = "Invalid {0}")]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        [JsonIgnore]
        public UserRoleEnum Role { get; set; } = UserRoleEnum.Customer;
    }
}