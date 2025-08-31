using DataAccessLayer.Models.ProductEntities;
using System.ComponentModel.DataAnnotations;

namespace DataAccessLayer.Models.OrderEntities
{
    public class OrderDetail
    {
        [Required]
        [Range(0.0, int.MaxValue, ErrorMessage = "Quantity must be a non-negative value")]
        public int Quantity { get; set; }

        [Required]
        [Range(0.0, double.MaxValue, ErrorMessage = "Price must be a non-negative value")]
        public double UnitPrice { get; set; }

        [Required]
        [Range(0.0, double.MaxValue, ErrorMessage = "Total must be a non-negative value")]
        public double Total { get; set; } = 0;

        [Required]
        public int OrderId { get; set; }
        public Order Order { get; set; }

        [Required]
        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}