using Amazon.S3;
using BusinessLogicLayer.Interfaces.Services;
using Microsoft.AspNetCore.Http;

namespace BusinessLogicLayer.Implements.Services
{
    public class ImageService : IImageService
    {
        public async Task<string> UploadImageAsync(IFormFile file, string bucketName, IAmazonS3 s3Client)
        {
            var fileTransferUtility = new Amazon.S3.Transfer.TransferUtility(s3Client);
            var fileExtension = Path.GetExtension(file.FileName);
            var uniqueFileName = $"{Guid.NewGuid()}{fileExtension}";

            using (var stream = file.OpenReadStream())
            {
                var uploadRequest = new Amazon.S3.Transfer.TransferUtilityUploadRequest
                {
                    InputStream = stream,
                    Key = uniqueFileName,
                    BucketName = bucketName,
                    ContentType = file.ContentType
                };
                await fileTransferUtility.UploadAsync(uploadRequest);
            }

            string fileUrl = $"https://{bucketName}.s3.amazonaws.com/{uniqueFileName}";

            return fileUrl;
        }
    }
}