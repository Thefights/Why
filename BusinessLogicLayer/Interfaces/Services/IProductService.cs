using BusinessLogicLayer.DTO.ProductDTO;
using BusinessLogicLayer.Interfaces.Base;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Http;

namespace BusinessLogicLayer.Interfaces.Services
{
    public interface IProductService : ICrudService<ProductCreateDTO, ProductGetDTO, ProductUpdateDTO, Product>
    {
        public Task<Product> CreateProductWithImageAsync(Product product, IFormFile imageFile);
    }
}