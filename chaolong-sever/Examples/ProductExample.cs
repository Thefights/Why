using DataAccessLayer.Models.ProductEntities;
using Swashbuckle.AspNetCore.Filters;

namespace DataAccessLayer.Examples
{
    internal class ProductExample : IExamplesProvider<Product>
    {
        public Product GetExamples()
        {
            return new Product
            {
                Name = "Chaolong Tea",
                Quantity = 100,
                Price = 10.99,
                Description = "A fine selection of Chaolong tea.",
                ImageUrl = "/test.png",
                ProductCategoryId = 1
            };
        }
    }
}