using DataAccessLayer.Enums;
using DataAccessLayer.Models.AbstractEntities;
using System.ComponentModel.DataAnnotations;

namespace DataAccessLayer.Models
{
    public class Order : BaseEntity
    {
        [Required]
        public DateTime OrderDate { get; set; }

        [Required]
        [Range(0.0, double.MaxValue, ErrorMessage = "TotalAmount must be a non-negative value")]
        public double TotalAmount { get; set; }

        [Required]
        public OrderStatusEnum Status { get; set; }

        [Required]
        public int UserId { get; set; }
        public User User { get; set; }

        public int? VoucherId { get; set; }
        public Voucher? Voucher { get; set; }

        public ICollection<OrderDetail> OrderDetails { get; set; } = [];
    }
}