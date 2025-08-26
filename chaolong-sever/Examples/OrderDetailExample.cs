using DataAccessLayer.Models;
using Swashbuckle.AspNetCore.Filters;

namespace chaolong_sever.Examples
{
    internal class OrderDetailExample : IExamplesProvider<OrderDetail>
    {
        public OrderDetail GetExamples()
        {
            return new OrderDetail
            {
                OrderId = 1,
                ProductId = 1,
                Quantity = 2,
                UnitPrice = 2.5
            };
        }
    }
}