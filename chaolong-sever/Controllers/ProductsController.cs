using BusinessLogicLayer.Interfaces.Services;
using chaolong_sever.Controllers.Base;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Mvc;

namespace chaolong_sever.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController(IProductService _productService) : CrudController<Product>(_productService)
    {
    }
}
