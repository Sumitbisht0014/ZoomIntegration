using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZoomApp.Services.Zoom
{
    public class URLConstants
    {
        private static string BaseURL= "https://api.zoom.us/v2";
        public static string CREATE_MEETING = $"{BaseURL}/users/:userId/meetings";
        public static string GET_MEETING = $"{BaseURL}/users/:userId/meetings?type=upcoming&page_size=30";

        public static string CreateMeetingURL(string userId)
        {
            return CREATE_MEETING.Replace(":userId", userId);
        }
        public static string GetMeetingURL(string userId)
        {
            return GET_MEETING.Replace(":userId", userId);
        }

    }
}
