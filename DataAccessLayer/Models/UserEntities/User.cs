using DataAccessLayer.Enums;
using DataAccessLayer.Models.AbstractEntities;
using DataAccessLayer.Models.OrderEntities;
using System.ComponentModel.DataAnnotations;

namespace DataAccessLayer.Models.UserEntities
{
    public class User : ImageEntity
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
        public UserRoleEnum Role { get; set; }

        [Required]
        public string Password { get; set; } = string.Empty;

        public ICollection<UserVoucher> UserVouchers { get; set; } = [];
        public ICollection<Order> Orders { get; set; } = [];
        public ICollection<RefreshToken> RefreshTokens { get; set; } = [];
    }
}