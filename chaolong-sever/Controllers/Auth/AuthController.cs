using BusinessLogicLayer.Attributes;
using BusinessLogicLayer.DTO.UserDTO;
using BusinessLogicLayer.Implements.Services;
using Microsoft.AspNetCore.Mvc;

namespace chaolong_sever.Controllers.Auth
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IAuthService _authService) : ControllerBase
    {
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register(AuthUserRequestDTO dto)
        {
            var user = await _authService.RegisterAsync(dto);
            return Ok("Registration successful");
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate(string email, string password)
        {
            var authResponse = await _authService.AuthenticateAsync(email, password);
            return Ok(authResponse);
        }

        [HttpPost("refresh-token")]
        public async Task<ActionResult> RefreshToken(string refreshToken)
        {
            var result = await _authService.RefreshTokenAsync(refreshToken);
            if (result is null || result.AccessToken is null || result.RefreshToken is null)
                return Unauthorized("Invalid refresh token.");

            return Ok(result);
        }
    }
}