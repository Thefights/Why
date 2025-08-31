using BusinessLogicLayer.DTO.UserDTO;
using BusinessLogicLayer.Interfaces.Services;
using BusinessLogicLayer.Utils;
using DataAccessLayer.Models.UserEntities;
using DataAccessLayer.Repository.IRepository.Base;

namespace BusinessLogicLayer.Implements.Services
{
    public class AuthService(IUnitOfWork _unitOfWork, JwtUtils _jwtUtils) : IAuthService
    {
        public async Task<User> RegisterAsync(string email, string password)
        {
            // Check if user already exists
            var existingUser = await GetUserByEmailAsync(email);

            if (existingUser != null)
            {
                throw new Exception("User already exists.");
            }

            // Create new user
            var user = new User
            {
                Email = email,
                Password = CryptoUtil.EncryptPassword(password)
            };

            await _unitOfWork.Repository<User>().CreateAsync(user);
            await _unitOfWork.SaveChangesAsync();

            return user;
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

        private async Task<User> GetUserByEmailAsync(string email)
        {
            var user = await _unitOfWork.Repository<User>().GetByCondition(u => u.Email == email);
            //if (user == null)
            //{
            //    throw new Exception("User not found.");
            //}
            return user;
        }
    }
}