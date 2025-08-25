using DataAccessLayer.Models.AbstractEntities;
using System.ComponentModel.DataAnnotations;

namespace DataAccessLayer.Models
{
    public class Product : ImageEntity
    {
        public ICollection<OrderDetail> OrderDetails { get; set; } = [];

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        [Range(0.0, int.MaxValue, ErrorMessage = "Quantity must be a non-negative value")]
        public int Quantity { get; set; }

        [Required]
        [Range(0.0, double.MaxValue, ErrorMessage = "Price must be a non-negative value")]
        public double Price { get; set; }

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        public int ProductCategoryId { get; set; }

        public ProductCategory ProductCategory { get; set; }
    }
}