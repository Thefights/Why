using DataAccessLayer.Models.AbstractEntities;
using DataAccessLayer.Models.OrderEntities;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace DataAccessLayer.Models.ProductEntities
{
    public class Product : ImageEntity
    {
        [JsonIgnore]
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

        [JsonIgnore]
        public ProductCategory? ProductCategory { get; set; }
    }
}