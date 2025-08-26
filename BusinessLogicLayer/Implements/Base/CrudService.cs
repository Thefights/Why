using AutoMapper;
using BusinessLogicLayer.DTO.Abstract;
using BusinessLogicLayer.Interfaces.Base;
using BusinessLogicLayer.Interfaces.Services;
using DataAccessLayer.Models.AbstractEntities;
using DataAccessLayer.Repository.IRepository.Base;
using Microsoft.AspNetCore.Http;

namespace BusinessLogicLayer.Implements.Base
{
    public class CrudService<DTO, T>(IUnitOfWork _unitOfWork, IMapper _mapper, IImageService? _imageService) : ICrudService<DTO, T> where DTO : BaseDTO where T : BaseEntity
    {
        public async Task<DTO> GetByIdAsync(int id)
        {
            var entity = await _unitOfWork.Repository<T>().GetByIdAsync(id);
            return _mapper.Map<DTO>(entity);
        }

        public async Task<IEnumerable<DTO>> GetAllAsync()
        {
            var entities = await _unitOfWork.Repository<T>().GetAllAsync();
            return _mapper.Map<IEnumerable<DTO>>(entities);
        }

        public async Task<DTO> CreateAsync(DTO dto)
        {
            var entity = _mapper.Map<T>(dto);
            await _unitOfWork.Repository<T>().CreateAsync(entity);
            await _unitOfWork.SaveChangesAsync();

            return dto;
        }

        public async Task<DTO> CreateWithImageAsync(DTO dto)
        {
            var entity = _mapper.Map<T>(dto);

            var dtoType = typeof(DTO);
            var imageFileProp = dtoType.GetProperty("ImageFile");

            var imageFile = imageFileProp?.GetValue(dto) as IFormFile;

            if (imageFile != null && imageFile.Length > 0)
            {
                var imageUrlResult = await _imageService.UploadImageAsync(imageFile, "chaolong-bucket");

                var imageProperty = typeof(T).GetProperty("ImageUrl");
                if (imageProperty != null && imageProperty.PropertyType == typeof(string))
                {
                    imageProperty.SetValue(entity, imageUrlResult);
                }
            }

            await _unitOfWork.Repository<T>().CreateAsync(entity);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<DTO>(entity);
        }

        public async Task UpdateAsync(DTO dto)
        {
            var entity = _mapper.Map<T>(dto);
            _unitOfWork.Repository<T>().Update(entity);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task DeleteAsync(DTO dto)
        {
            var entity = _mapper.Map<T>(dto);

            _unitOfWork.Repository<T>().Delete(entity);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}