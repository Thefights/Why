using Amazon.S3;
using Microsoft.AspNetCore.Http;

namespace BusinessLogicLayer.Interfaces
{
    public interface IImageService
    {
        public Task<string> UploadImageAsync(IFormFile file, string bucketName, IAmazonS3 s3Client);
    }
}
