using BusinessLogicLayer.DTO.Abstract;
using DataAccessLayer.Models.AbstractEntities;

namespace BusinessLogicLayer.Interfaces.Base
{
    public interface ICrudService<DTO, T> where T : BaseEntity where DTO : BaseDTO
    {
        public Task<IEnumerable<DTO>> GetAllAsync();
        public Task<DTO?> GetByIdAsync(int id);
        public Task<DTO> CreateAsync(DTO dto);
        public Task<DTO> CreateWithImageAsync(DTO dto);
        public Task UpdateAsync(DTO dto);
        public Task DeleteAsync(DTO dto);
    }
}