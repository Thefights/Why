﻿using BusinessLogicLayer.Helpers;
using BusinessLogicLayer.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using static BusinessLogicLayer.Implements.Services.UserService;

namespace chaolong_sever.Authorization
{
    public class JwtMiddleware(RequestDelegate _next, IOptions<AppSettings> _appSettings)
    {
        public async Task InvokeAsync(HttpContext context, IUserService _userService, JwtUtils jwtUtils)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault();
            var userId = jwtUtils.ValidateJwtToken(token);
            if (userId != null)
            {
                var user = await _userService.GetUserById(userId.Value);
                if (user != null)
                {
                    var claims = new List<Claim>
                    {
                        new Claim("id", user.Id.ToString()),
                        new Claim(ClaimTypes.Role, user.Role.ToString()),
                        new Claim(ClaimTypes.Name, user.Name),
                        new Claim(ClaimTypes.Email, user.Email)
                    };

                    var identity = new ClaimsIdentity(claims, "jwt");
                    context.User = new ClaimsPrincipal(identity);
                }
            }

            await _next(context);
        }
    }
}