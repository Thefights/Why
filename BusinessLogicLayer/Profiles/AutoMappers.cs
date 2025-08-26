using AutoMapper;
using BusinessLogicLayer.DTO;
using DataAccessLayer.Models;

namespace BusinessLogicLayer.Profiles
{
    public class AutoMappers : Profile
    {
        public AutoMappers()
        {
            CreateMap<Product, ProductDTO>().ReverseMap();
        }
    }
}