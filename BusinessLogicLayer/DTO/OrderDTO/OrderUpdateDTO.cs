using BusinessLogicLayer.DTO.Abstract.Base;
using DataAccessLayer.Enums;

namespace BusinessLogicLayer.DTO.OrderDTO
{
    public class OrderUpdateDTO : BaseWithIdDTO
    {
        public DateTime OrderDate { get; set; }

        public double TotalAmount { get; set; }

        public OrderStatusEnum Status { get; set; }

        public int UserId { get; set; }

        public int? VoucherId { get; set; }

        public List<OrderGetDTO> OrderDetails { get; set; } = [];
    }
}