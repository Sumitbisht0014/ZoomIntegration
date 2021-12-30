using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZoomApp.Models
{
    public class MeetingModel
    {
        public string UserName { get; set; }
        public string Topic { get; set; }
        public string agenda { get; set; }
        public string type { get; set; }
        public string duration { get; set; }
        public string password { get; set; }
    }
}
