using AutoMapper;
using BusinessLogicLayer.DTO.UserDTO;
using BusinessLogicLayer.Helpers;
using BusinessLogicLayer.Utils;
using DataAccessLayer.Models.UserEntities;
using DataAccessLayer.Repository.Base;
using Microsoft.Extensions.Options;

namespace BusinessLogicLayer.Implements.Services
{
    public interface IAuthService
    {
        public Task<User> RegisterAsync(AuthUserRequestDTO dto);
        public Task<AuthUserRespondDTO> AuthenticateAsync(string email, string password);

    }

    public class AuthService(IUnitOfWork _unitOfWork, JwtUtils _jwtUtils, IMapper _mapper, IOptions<AppSettings> _appSettings) : IAuthService
    {
        public async Task<User> RegisterAsync(AuthUserRequestDTO dto)
        {
            // Check if user already exists
            var existingUser = await GetUserByEmailAsync(dto.Email);

            if (existingUser != null)
            {
                throw new Exception("User already exists.");
            }

            var entity = _mapper.Map<User>(dto);

            entity.Password = CryptoUtil.EncryptPassword(dto.Password);

            await _unitOfWork.Repository<User>().CreateAsync(entity);
            await _unitOfWork.SaveChangesAsync();

            return entity;
        }

        public async Task<AuthUserRespondDTO> AuthenticateAsync(string email, string password)
        {
            var user = await _unitOfWork.Repository<User>().GetByCondition(u => u.Email == email);
            if (user == null || !CryptoUtil.IsPasswordCorrect(password, user.Password))
            {
                throw new Exception("Email or password is incorrect.");
            }

            var jwtToken = _jwtUtils.GenerateJwtToken(user);

            return new AuthUserRespondDTO(user, jwtToken);
        }

        private async Task<User?> GetUserByEmailAsync(string email)
        {
            var user = await _unitOfWork.Repository<User>().GetByCondition(u => u.Email == email);

            return user;
        }
    }
}