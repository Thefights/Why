using BusinessLogicLayer.DTO.VoucherDTO;
using BusinessLogicLayer.Interfaces.Base;

namespace BusinessLogicLayer.Interfaces.Services
{
    public interface IVoucherService : ICrudService<VoucherCreateDTO, VoucherGetDTO, VoucherUpdateDTO, Voucher>
    {
    }
}
