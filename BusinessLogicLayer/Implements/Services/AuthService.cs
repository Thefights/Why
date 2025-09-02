using AutoMapper;
using BusinessLogicLayer.DTO.UserDTO;
using BusinessLogicLayer.Utils;
using DataAccessLayer.Models.UserEntities;
using DataAccessLayer.Repository.Base;

namespace BusinessLogicLayer.Implements.Services
{
    public interface IAuthService
    {
        public Task<User> RegisterAsync(AuthUserRequestDTO dto);
        public Task<AuthUserRespondDTO> AuthenticateAsync(string email, string password, string ipAddress);

    }

    public class AuthService(IUnitOfWork _unitOfWork, JwtUtils _jwtUtils, IMapper _mapper) : IAuthService
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

        public async Task<AuthUserRespondDTO> AuthenticateAsync(string email, string password, string ipAddress)
        {
            var user = await _unitOfWork.Repository<User>().GetByCondition(u => u.Email == email);
            if (user == null || !CryptoUtil.IsPasswordCorrect(password, user.Password))
            {
                throw new Exception("Email or password is incorrect.");
            }

            var jwtToken = _jwtUtils.GenerateJwtToken(user);
            var refreshToken = _jwtUtils.GenerateRefreshToken(ipAddress);
            user.RefreshTokens.Add(refreshToken);

            //remove old refresh tokens from user
            RemoveOldRefreshTokens(user);
            await _unitOfWork.SaveChangesAsync();

            return new AuthUserRespondDTO(user, jwtToken, refreshToken.Token);
        }

        private void RemoveOldRefreshTokens(User user)
        {
            var oldTokens = user.RefreshTokens.Where(x =>
                !x.IsActive &&
                x.Created.AddDays(7) <= DateTime.UtcNow).ToList();

            _unitOfWork.Repository<RefreshToken>().DeleteRange(oldTokens);
        }

        private async Task<User?> GetUserByEmailAsync(string email)
        {
            var user = await _unitOfWork.Repository<User>().GetByCondition(u => u.Email == email);

            return user;
        }
    }
}