using BusinessLogicLayer.DTO.Abstract.Base;
using DataAccessLayer.Models.AbstractEntities;

namespace BusinessLogicLayer.Interfaces.Base
{
    public interface ICrudService<CreateDTO, GetDTO, UpdateDTO, T>
        where CreateDTO : BaseDTO
        where GetDTO : BaseDTO
        where UpdateDTO : BaseDTO
        where T : BaseEntity
    {
        public Task<GetDTO> GetByIdAsync(int id);
        public Task<IEnumerable<GetDTO>> GetAllAsync();
        public Task<CreateDTO> CreateAsync(CreateDTO dto);
        public Task<CreateDTO> CreateWithImageAsync(CreateDTO dto);
        public Task UpdateAsync(UpdateDTO dto);
        public Task UpdateWithImageAsync(UpdateDTO dto);
        public Task DeleteAsync(int id);
    }
}