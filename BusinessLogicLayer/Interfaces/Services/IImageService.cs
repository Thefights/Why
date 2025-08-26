using Microsoft.AspNetCore.Http;

namespace BusinessLogicLayer.Interfaces.Services
{
    public interface IImageService
    {
        public Task<string> UploadImageAsync(IFormFile file, string bucketName);
    }
}
