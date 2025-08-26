using BusinessLogicLayer.DTO.Abstract;

namespace BusinessLogicLayer.DTO
{
    public class ProductDTO : ImageDTO
    {
        public string Name { get; set; } = string.Empty;

        public int Quantity { get; set; }

        public double Price { get; set; }

        public string Description { get; set; } = string.Empty;

        public int ProductCategoryId { get; set; }
    }
}