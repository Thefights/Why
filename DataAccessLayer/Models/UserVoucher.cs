using System.ComponentModel.DataAnnotations;

namespace DataAccessLayer.Models
{
    public class UserVoucher
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public int VoucherId { get; set; }
        public Voucher Voucher { get; set; }

        [Required]
        public bool IsUsed { get; set; }
    }
}