using BusinessLogicLayer.DTO.ProductDTO;
using BusinessLogicLayer.Interfaces.Services;
using chaolong_sever.Controllers.Base;
using DataAccessLayer.Models.ProductEntities;
using Microsoft.AspNetCore.Mvc;

namespace chaolong_sever.Controllers.Manager
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductManagementController(IProductService _productService) : CrudController<ProductCreateDTO, ProductUpdateDTO, ProductGetDTO, Product>(_productService)
    {
    }
}