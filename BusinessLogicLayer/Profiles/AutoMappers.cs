using AutoMapper;
using BusinessLogicLayer.DTO.ProductDTO;
using DataAccessLayer.Models;

namespace BusinessLogicLayer.Profiles
{
    public class AutoMappers : Profile
    {
        public AutoMappers()
        {
            CreateMap<Product, ProductCreateDTO>().ReverseMap();
            CreateMap<Product, ProductUpdateDTO>().ReverseMap();
            CreateMap<Product, ProductGetDTO>().ReverseMap();

        }
    }
}