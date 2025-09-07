using BusinessLogicLayer.DTO.Abstract.Base;

namespace BusinessLogicLayer.DTO.Abstract.ImageDTO
{
    public abstract class GetImageDTO : BaseDTO
    {
        public string ImageUrl { get; set; } = string.Empty;
    }
}