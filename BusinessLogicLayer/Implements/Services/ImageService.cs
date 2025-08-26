using Amazon.S3;
using BusinessLogicLayer.Interfaces.Services;
using Microsoft.AspNetCore.Http;

namespace BusinessLogicLayer.Implements.Services
{
    public class ImageService(IAmazonS3 _s3Client) : IImageService
    {
        public async Task<string> UploadImageAsync(IFormFile _file, string _bucketName)
        {
            var fileTransferUtility = new Amazon.S3.Transfer.TransferUtility(_s3Client);
            var fileExtension = Path.GetExtension(_file.FileName);
            var uniqueFileName = $"{Guid.NewGuid()}{fileExtension}";

            using (var stream = _file.OpenReadStream())
            {
                var uploadRequest = new Amazon.S3.Transfer.TransferUtilityUploadRequest
                {
                    InputStream = stream,
                    Key = uniqueFileName,
                    BucketName = _bucketName,
                    ContentType = _file.ContentType
                };
                await fileTransferUtility.UploadAsync(uploadRequest);
            }

            string fileUrl = $"https://{_bucketName}.s3.amazonaws.com/{uniqueFileName}";

            return fileUrl;
        }
    }
}