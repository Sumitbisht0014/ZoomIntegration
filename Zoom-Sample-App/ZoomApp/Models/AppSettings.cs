using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZoomApp.Models
{
    public class AppSettings
    {
        public string ApiKey { get; set; }
        public string ApiSecretKey { get; set; }
        public string APIToken { get; set; }
        public string DbConnection { get; set; }
        public string UserName { get; set; }
    }
}
