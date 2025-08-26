using Microsoft.AspNetCore.Http;

namespace BusinessLogicLayer.DTO.Abstract
{
    public class ImageDTO : BaseDTO
    {
        public IFormFile ImageFile { get; set; }

        //public string ImageUrl { get; set; } = string.Empty;
    }
}