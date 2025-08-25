using DataAccessLayer.Enums;
using DataAccessLayer.Models.AbstractEntities;
using System.ComponentModel.DataAnnotations;

namespace DataAccessLayer.Models
{
    public class Voucher : BaseEntity
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "Quantity must be a non-negative value")]
        public int Quantity { get; set; }

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        public string Code { get; set; } = string.Empty;

        [Required]
        [Range(0.0, double.MaxValue, ErrorMessage = "Discount must be a non-negative value")]
        public double DiscountAmount { get; set; }

        [Required]
        public DateTime ExpiryDate { get; set; }

        [Required]
        public VoucherStatusEnum Status { get; set; }

        public ICollection<Order> Orders { get; set; } = [];
        public ICollection<UserVoucher> UserVouchers { get; set; } = [];
    }
}