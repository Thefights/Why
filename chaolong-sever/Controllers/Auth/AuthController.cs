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
            return Ok(user);
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate(string email, string password, string ipAddress)
        {
            var authResponse = await _authService.AuthenticateAsync(email, password, ipAddress);
            return Ok(authResponse);
        }
    }
}