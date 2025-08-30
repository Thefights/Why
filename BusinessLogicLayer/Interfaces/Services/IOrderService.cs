using BusinessLogicLayer.DTO.OrderDTO;
using BusinessLogicLayer.Interfaces.Base;
using DataAccessLayer.Models;

namespace BusinessLogicLayer.Interfaces.Services
{
    public interface IOrderService : IRuService<OrderGetDTO, OrderUpdateDTO, Order>
    {
    }
}
