using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Interfaces.Base;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Http;

namespace BusinessLogicLayer.Interfaces.Services
{
    public interface IProductService : ICrudService<ProductDTO, Product>
    {
        public Task<Product> CreateProductWithImageAsync(Product product, IFormFile imageFile);
    }
}
