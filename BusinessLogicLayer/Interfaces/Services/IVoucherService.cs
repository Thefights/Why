using BusinessLogicLayer.DTO.VoucherDTO;
using BusinessLogicLayer.Interfaces.Base;
using DataAccessLayer.Models.UserEntities;

namespace BusinessLogicLayer.Interfaces.Services
{
    public interface IVoucherService : ICrudService<VoucherCreateDTO, VoucherGetDTO, VoucherUpdateDTO, Voucher>
    {
    }
}
