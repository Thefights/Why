using AutoMapper;
using BusinessLogicLayer.DTO.VoucherDTO;
using BusinessLogicLayer.Implements.Base;
using BusinessLogicLayer.Interfaces.Services;
using DataAccessLayer.Models;
using DataAccessLayer.Repository.IRepository.Base;

namespace BusinessLogicLayer.Implements.Services
{
    public class VoucherService(IUnitOfWork _unitOfWork, IMapper _mapper) : CrudService<VoucherCreateDTO, VoucherGetDTO, VoucherUpdateDTO, Voucher>(_unitOfWork, _mapper), IVoucherService
    {
    }
}
