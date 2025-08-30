using BusinessLogicLayer.DTO.Abstract.Base;
using BusinessLogicLayer.DTO.OrderDetailDTO;
using DataAccessLayer.Enums;
using DataAccessLayer.Models;

namespace BusinessLogicLayer.DTO.OrderDTO
{
    public class OrderGetDTO : BaseWithIdDTO
    {
        public DateTime OrderDate { get; set; }

        public double TotalAmount { get; set; }

        public OrderStatusEnum Status { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public int? VoucherId { get; set; }
        public Voucher? Voucher { get; set; }

        public List<OrderDetailGetDTO> OrderDetails { get; set; }
    }
}