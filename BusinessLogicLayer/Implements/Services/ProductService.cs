using BusinessLogicLayer.Implements.Base;
using BusinessLogicLayer.Interfaces.Services;
using DataAccessLayer.Models;
using DataAccessLayer.Repository.IRepository.Base;

namespace BusinessLogicLayer.Implements.Services
{
    public class ProductService(IUnitOfWork _unitOfWork) : CrudService<Product>(_unitOfWork), IProductService
    {
    }
}
