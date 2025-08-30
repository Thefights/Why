using BusinessLogicLayer.DTO.Abstract.Base;
using DataAccessLayer.Models;
using System.ComponentModel.DataAnnotations;

namespace BusinessLogicLayer.DTO.OrderDetailDTO
{
    public class OrderDetailGetDTO : BaseDTO
    {
        public int Quantity { get; set; }

        public double UnitPrice { get; set; }

        public double Total { get; set; } = 0;

        public int OrderId { get; set; }
        public Order Order { get; set; }

        [Required]
        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}