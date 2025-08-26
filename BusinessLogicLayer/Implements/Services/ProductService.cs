using BusinessLogicLayer.Implements.Base;
using BusinessLogicLayer.Interfaces.Services;
using DataAccessLayer.Models;
using DataAccessLayer.Repository.IRepository.Base;
using Microsoft.AspNetCore.Http;

namespace BusinessLogicLayer.Implements.Services
{
    public class ProductService(IUnitOfWork _unitOfWork, IImageService _imageService) : CrudService<Product>(_unitOfWork), IProductService
    {

        public async Task<Product> CreateProductWithImageAsync(Product product, IFormFile imageFile)
        {
            if (imageFile != null && imageFile.Length > 0)
            {
                var imageUrl = await _imageService.UploadImageAsync(imageFile, "test-bucketname-thefight");
                product.ImageUrl = imageUrl;
            }

            await _unitOfWork.Repository<Product>().CreateAsync(product);
            await _unitOfWork.SaveChangesAsync();

            return product;
        }

    }
}