using BusinessLogicLayer.Interfaces;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Mvc;

namespace chaolong_sever.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController(IProductService _productService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAllProductsAsync()
        {
            var products = await _productService.GetAllAsync();
            return Ok(products);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProductAsync([FromBody] Product entity)
        {
            var createdProduct = await _productService.CreateAsync(entity);
            return Ok(createdProduct);
        }

        //[HttpPut("{id}")]
        //public async Task<IActionResult> UpdateProductAsync(int id, [FromBody] Product entity)
        //{
        //    if (id != entity.Id)
        //        return BadRequest("Product ID mismatch.");
        //    var updatedProduct = await _productService.UpdateAsync(id);
        //    if (updatedProduct == null)
        //        return NotFound();
        //    return Ok(updatedProduct);
        //}
    }
}
