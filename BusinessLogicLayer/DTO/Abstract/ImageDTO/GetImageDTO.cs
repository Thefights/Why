using BusinessLogicLayer.DTO.Abstract.Base;

namespace BusinessLogicLayer.DTO.Abstract.ImageDTO
{
    public abstract class GetImageDTO : BaseWithIdDTO
    {
        public string ImageUrl { get; set; } = string.Empty;
    }
}