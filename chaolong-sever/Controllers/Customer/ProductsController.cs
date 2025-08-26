using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Interfaces.Services;
using chaolong_sever.Controllers.Base;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Mvc;

namespace chaolong_sever.Controllers.Customer
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController(IProductService _productService) : CrudController<ProductDTO, Product>(_productService)
    {
        //[HttpPost]
        //public async Task<IActionResult> CreateAsync([FromForm] Product entity, IFormFile imageFile)
        //{
        //    var product = await _productService.CreateProductWithImageAsync(entity, imageFile);

        //    return Ok(new { Message = "Create new record successfully", Data = product });
        //}
    }
}