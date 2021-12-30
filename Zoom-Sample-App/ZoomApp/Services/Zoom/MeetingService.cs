using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ZoomApp.Models;
using ZoomApp.Models.DB;

namespace ZoomApp.Services.Zoom
{
    public class MeetingService
    {
        public string CreateMeeting(AppSettings appSettings, MeetingModel meetingDetails)
        {
            try
            {
                JObject requestBody = GetDummyRequest(appSettings.UserName, meetingDetails);
                RestCallHelper restCallHelper = new RestCallHelper();
                APIResponse response = new APIResponse { Message = GetDummyResponse() };
                if (string.IsNullOrEmpty(GetDummyResponse()))
                {
                    response = restCallHelper.Post(URLConstants.CreateMeetingURL("me"), requestBody, GetHeader(appSettings.APIToken));
                    SaveMeetingData(response, appSettings);
                    //CreateDummyResponse(response.Message);
                }
                return response.Message;
            }
            catch (Exception ex)
            {
                // _logger.LogError($"{ex.ToString()}");
                throw;
            }
        }
        public string GetMeetings(AppSettings appSettings)
        {
            try
            {
                RestCallHelper restCallHelper = new RestCallHelper();
                return restCallHelper.Get(URLConstants.GetMeetingURL("me"), GetHeader(appSettings.APIToken)).Message;
            }
            catch (Exception ex)
            {
                //_logger.LogError($"{ex.ToString()}");
                throw;
            }
        }

        public MeetingCredentials GetMeetingsCreds(AppSettings appSettings, string meetingId)
        {
            MeetingCredentials meetingCredentials = new MeetingCredentials();
            using (AppDbContext context = new AppDbContext(appSettings.DbConnection))
            {
                long meetingID = Convert.ToInt64(meetingId);
                MeetingDetails details = context.MeetingDetails.Where(x => x.MeetingId == meetingID).FirstOrDefault();
                meetingCredentials.MeetingId = details.MeetingId;
                meetingCredentials.Password = details.Password;
                meetingCredentials.ApiKey = appSettings.ApiKey;
            }
            return meetingCredentials;
        }

        private void SaveMeetingData(APIResponse response, AppSettings appSettings)
        {
            if (response.IsSuccess)
            {
                using (AppDbContext context = new AppDbContext(appSettings.DbConnection))
                {
                    JObject result = JObject.Parse(response.Message);
                    MeetingDetails details = new MeetingDetails();
                    long id = 0;
                    Int64.TryParse(Convert.ToString(result["id"]), out id);
                    details.MeetingId = id;
                    details.Password = Convert.ToString(result["password"]);
                    details.AdditionalData = response.Message;
                    context.MeetingDetails.Add(details);
                    context.SaveChanges();
                }
            }
        }

        private void CreateDummyResponse(string data)
        {
            string filePath = @"D:\Workspace\Docs\Zoom\ZoomApp\ZoomApp\Data\DummyResponse.json";
            File.WriteAllText(filePath, data);
        }

        private string GetDummyResponse()
        {
            string dummyResponse = "";
            string filePath = @"D:\Workspace\Docs\Zoom\ZoomApp\ZoomApp\Data\DummyResponse.json";
            if (File.Exists(filePath))
                dummyResponse = File.ReadAllText(filePath);
            return dummyResponse;
        }

        private JObject GetDummyRequest(string userName, MeetingModel meetingDetails)
        {
            JObject requestBody = new JObject();
            requestBody.Add("topic", meetingDetails.Topic);
            requestBody.Add("agenda", meetingDetails.agenda);
            requestBody.Add("type", meetingDetails.type);
            requestBody.Add("start_time", DateTime.Now.AddMinutes(10));
            requestBody.Add("duration", meetingDetails.duration);
            requestBody.Add("schedule_for", userName);
            requestBody.Add("timezone", "Asia/Calcutta");

            JObject settings = new JObject();
            settings.Add("host_video", false);
            settings.Add("participant_video", false);
            settings.Add("cn_meeting", false);
            settings.Add("in_meeting", false);
            settings.Add("join_before_host", true);
            settings.Add("mute_upon_entry", false);
            settings.Add("watermark", true);
            settings.Add("use_pmi", false);
            settings.Add("approval_type", "2");
            settings.Add("registration_type", "1");

            settings.Add("audio", "both");
            settings.Add("auto_recording", "none");
            settings.Add("enforce_login", false);
            settings.Add("enforce_login_domains", "");
            settings.Add("alternative_hosts", "");
            settings.Add("global_dial_in_countries", new JArray());
            settings.Add("registrants_email_notification", true);

            requestBody.Add("settings", settings);
            return requestBody;
        }
        private string GetRandomMeetingNumber()
        {
            return $"Demo Meeting_{new Random().Next(1, 1000)}";
        }

        private Dictionary<string, object> GetHeader(string apiToken)
        {
            Dictionary<string, object> header = new Dictionary<string, object>();
            header.Add("Authorization", $"Bearer {apiToken}");
            header.Add("Content-Type", "application/json");
            return header;
        }
    }
}
