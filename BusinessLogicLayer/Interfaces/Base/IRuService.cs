namespace BusinessLogicLayer.Interfaces.Base
{
    public interface IRuService<GetDTO, UpdateDTO, T>
    {
        public Task<GetDTO> GetByIdAsync(int id);
        public Task<IEnumerable<GetDTO>> GetAllAsync();
        public Task UpdateAsync(UpdateDTO dto);
        public Task UpdateWithImageAsync(UpdateDTO dto);
    }
}
