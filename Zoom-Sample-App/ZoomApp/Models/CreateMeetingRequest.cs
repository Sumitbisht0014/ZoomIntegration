using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZoomApp.Models
{
    public class CreateMeetingRequest
    {
    }
    public class MeetingCredentials
    {
        public long MeetingId { get; set; }
        public string Password { get; set; }
        public string ApiKey { get; set; }
        public string Signature { get; set; }
        public string Role { get; set; }
    }
}
