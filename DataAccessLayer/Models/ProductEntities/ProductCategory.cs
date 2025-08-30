using DataAccessLayer.Models.AbstractEntities;
using System.ComponentModel.DataAnnotations;

namespace DataAccessLayer.Models.ProductEntities
{
    public class ProductCategory : BaseEntity
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        public ICollection<Product> Products { get; set; } = [];
    }
}