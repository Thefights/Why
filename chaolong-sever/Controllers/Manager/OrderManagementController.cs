using BusinessLogicLayer.DTO.OrderDTO;
using BusinessLogicLayer.Interfaces.Services;
using chaolong_sever.Controllers.Base;
using DataAccessLayer.Models.OrderEntities;
using Microsoft.AspNetCore.Mvc;

namespace chaolong_sever.Controllers.Manager
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderManagementController(IOrderService _orderService) : RuController<OrderGetDTO, OrderUpdateDTO, Order>(_orderService)
    {
    }
}
