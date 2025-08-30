using BusinessLogicLayer.DTO.Abstract.Base;
using Microsoft.AspNetCore.Http;

namespace BusinessLogicLayer.DTO.Abstract.ImageDTO
{
    public abstract class UpdateImageDTO : BaseWithIdDTO
    {
        public IFormFile ImageFile { get; set; }
    }
}