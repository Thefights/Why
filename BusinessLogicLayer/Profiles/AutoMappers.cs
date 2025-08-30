using AutoMapper;
using BusinessLogicLayer.DTO.ProductDTO;
using BusinessLogicLayer.DTO.VoucherDTO;
using DataAccessLayer.Models;

namespace BusinessLogicLayer.Profiles
{
    public class AutoMappers : Profile
    {
        public AutoMappers()
        {
            //Product
            CreateMap<Product, ProductCreateDTO>().ReverseMap();
            CreateMap<Product, ProductUpdateDTO>().ReverseMap();
            CreateMap<Product, ProductGetDTO>().ReverseMap();

            //Voucher
            CreateMap<Voucher, VoucherCreateDTO>().ReverseMap();
            CreateMap<Voucher, VoucherUpdateDTO>().ReverseMap();
            CreateMap<Voucher, VoucherGetDTO>().ReverseMap();

        }
    }
}