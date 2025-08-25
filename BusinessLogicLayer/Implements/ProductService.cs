using BusinessLogicLayer.Implements.Base;
using BusinessLogicLayer.Interfaces;
using DataAccessLayer.Models;
using DataAccessLayer.Repository.IRepository.Base;

namespace BusinessLogicLayer.Implements
{
    public class ProductService(IUnitOfWork _unitOfWork) : CrudService<Product>(_unitOfWork), IProductService
    {
    }
}
