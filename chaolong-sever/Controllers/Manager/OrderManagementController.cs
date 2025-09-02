using BusinessLogicLayer.Attributes;
using BusinessLogicLayer.DTO.OrderDTO;
using BusinessLogicLayer.Implements.Services;
using chaolong_sever.Controllers.Base;
using DataAccessLayer.Models.OrderEntities;
using Microsoft.AspNetCore.Mvc;

namespace chaolong_sever.Controllers.Manager
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrderManagementController(IOrderService _orderService) : RuController<OrderGetDTO, OrderUpdateDTO, Order>(_orderService)
    {
    }
}
