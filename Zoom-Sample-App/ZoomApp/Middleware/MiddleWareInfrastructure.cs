using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZoomApp.Models;

namespace ZoomApp.Middleware
{
    public static class MiddleWareInfrastructure
    {
        public static void ConfigureServices(this IServiceCollection services, HostBuilderContext hostContext)
        {
            #region Configure 3rd Party Services
            services.AddLogging();


            #endregion
            IConfiguration configuration = hostContext.Configuration;
            AppSettings settings = configuration.GetSection("AppSettings").Get<AppSettings>();
        }
    }
}
