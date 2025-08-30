using BusinessLogicLayer.DTO.VoucherDTO;
using BusinessLogicLayer.Interfaces.Services;
using chaolong_sever.Controllers.Base;
using Microsoft.AspNetCore.Mvc;

namespace chaolong_sever.Controllers.Manager
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoucherManagementController(IVoucherService _voucherService) : CrudController<VoucherCreateDTO, VoucherUpdateDTO, VoucherGetDTO, Voucher>(_voucherService)
    {
    }
}