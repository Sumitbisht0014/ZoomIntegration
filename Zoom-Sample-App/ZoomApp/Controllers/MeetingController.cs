using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZoomApp.Models;
using ZoomApp.Services.Zoom;

namespace ZoomApp.Controllers
{
    public class MeetingController : BaseController
    {
        private readonly AppSettings _appSettings;
        private readonly MeetingService _meetingService;
        //private readonly ILogger _logger;
        public MeetingController(AppSettings appSettings, MeetingService meetingService) : base(appSettings)
        {
            //_logger = logger;
            //_logger.LogInformation($"Initialised MeetingController!");
            _appSettings = appSettings;
            _meetingService = meetingService;
        }
        [HttpPost("[action]")]
        public string CreateMeeting([FromBody] MeetingModel meetingDetails)
        {
            string token = base.GetToken();
            _appSettings.APIToken = token;
            return _meetingService.CreateMeeting(_appSettings, meetingDetails);
        }

        [HttpGet("[action]")]
        public string GetMeeting()
        {
            string token = base.GetToken();
            _appSettings.APIToken = token;
            return _meetingService.GetMeetings(_appSettings);
        }
        [HttpGet("[action]")]
        public MeetingCredentials GetMeetingCreds(string meetingId, string role)
        {
            MeetingCredentials creds = _meetingService.GetMeetingsCreds(_appSettings, meetingId);
            creds.Signature = base.GetSignature(meetingId, role);
            creds.Role = role;
            return creds;
        }

        [HttpPost("[action]")]
        public string GetStartMeetingData([FromQuery] string meetingId, string role)
        {
            string token = "";
            try
            {
                token = base.GetSignature(meetingId, role);
            }
            catch (Exception ex)
            {

            }

            return token;
        }
    }
}
