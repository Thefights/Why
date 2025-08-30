using BusinessLogicLayer.DTO.OrderDTO;
using BusinessLogicLayer.Interfaces.Base;
using DataAccessLayer.Models.OrderEntities;

namespace BusinessLogicLayer.Interfaces.Services
{
    public interface IOrderService : IRuService<OrderGetDTO, OrderUpdateDTO, Order>
    {
    }
}
