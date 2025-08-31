using BusinessLogicLayer.Helpers;
using BusinessLogicLayer.Interfaces.Services;
using BusinessLogicLayer.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace chaolong_sever.Authorization
{
    public class JwtMiddleware(RequestDelegate _next, IOptions<AppSettings> _appSettings)
    {
        public async Task Invoke(HttpContext context, IUserService userService, IJwtUtils jwtUtils)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            var userId = jwtUtils.ValidateJwtToken(token);
            if (userId != null)
            {
                // attach user to context on successful jwt validation
                context.Items["User"] = userService.GetUserById(userId.Value);
            }

            await _next(context);
        }
    }
}