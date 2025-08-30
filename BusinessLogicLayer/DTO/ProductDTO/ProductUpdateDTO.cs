using BusinessLogicLayer.DTO.Abstract.ImageDTO;

namespace BusinessLogicLayer.DTO.ProductDTO
{
    public class ProductUpdateDTO : UpdateImageDTO
    {
        public string Name { get; set; } = string.Empty;

        public int Quantity { get; set; }

        public double Price { get; set; }

        public string Description { get; set; } = string.Empty;

        public int ProductCategoryId { get; set; }
    }
}