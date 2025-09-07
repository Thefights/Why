using BusinessLogicLayer.DTO.Abstract.Base;
using Microsoft.AspNetCore.Http;

namespace BusinessLogicLayer.DTO.Abstract.ImageDTO
{
    public abstract class UpdateImageDTO : BaseDTO
    {
        public IFormFile ImageFile { get; set; }
    }
}