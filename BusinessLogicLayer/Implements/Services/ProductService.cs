using AutoMapper;
using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Implements.Base;
using BusinessLogicLayer.Interfaces.Services;
using DataAccessLayer.Models;
using DataAccessLayer.Repository.IRepository.Base;
using Microsoft.AspNetCore.Http;

namespace BusinessLogicLayer.Implements.Services
{
    public class ProductService(IUnitOfWork _unitOfWork, IImageService _imageService, IMapper _mapper) : CrudService<ProductDTO, Product>(_unitOfWork, _mapper, _imageService), IProductService
    {

        public async Task<Product> CreateProductWithImageAsync(Product product, IFormFile imageFile)
        {
            if (imageFile != null && imageFile.Length > 0)
            {
                var imageUrlResult = await _imageService.UploadImageAsync(imageFile, "test-bucketname-thefight");
                product.ImageUrl = imageUrlResult;
            }

            await _unitOfWork.Repository<Product>().CreateAsync(product);
            await _unitOfWork.SaveChangesAsync();

            return product;
        }
    }
}