using BusinessLogicLayer.Implements.Services;
using BusinessLogicLayer.Utils;
using DataAccessLayer.Repository.Base;

namespace chaolong_sever.Extenstions
{
    public static class ScopeServiceExtensions
    {
        public static IServiceCollection AddScopeService(this IServiceCollection _services)
        {
            _services.AddScoped<IUnitOfWork, UnitOfWork>();

            _services.AddScoped<IImageService, ImageService>();
            _services.AddScoped<IProductService, ProductService>();
            _services.AddScoped<IVoucherService, VoucherService>();
            //_services.AddScoped<IUserService, UserService>();
            _services.AddScoped<IOrderService, OrderService>();
            _services.AddScoped<IAuthService, AuthService>();

            _services.AddScoped<JwtUtils>();
            _services.AddScoped<CryptoUtil>();


            return _services;
        }
    }
}