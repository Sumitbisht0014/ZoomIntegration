using RestSharp;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace ZoomApp.Services
{
    public class APIResponse
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
    }
    public class RestCallHelper
    {
        public string PostV1(string url, object body, Dictionary<string, object> headers)
        {
            var client = new RestClient(url);
            client.Timeout = -1;
            var request = new RestRequest(Method.POST);
            foreach (KeyValuePair<string, object> keyValue in headers)
                request.AddHeader(keyValue.Key, Convert.ToString(keyValue.Value));
            //request.AddHeader("Content-Type", "application/json");
            //request.AddHeader("Authorization", $"Bearer {1}");
            //request.AddHeader("Cookie", "_zm_page_auth=aw1_c_oKQGb5J7S_6eCWIQ2ncCNQ; _zm_ssid=aw1_c_paRsHVWPSVaEEqqw0nPzYg; cred=7BBAD44415BB0811548DA39702BAD320");
            request.AddParameter("application/json", body, ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            Console.WriteLine(response.Content);
            return response.Content;
        }
        public APIResponse Get(string url, Dictionary<string, object> headers)
        {
            APIResponse response = new APIResponse { IsSuccess = false, Message = "" };
            try
            {
                WebClient m_client = new WebClient();
                m_client.Headers = FormHeaders(ConvertToDictionary(headers));
                m_client.Encoding = System.Text.Encoding.UTF8;

                Stream data = m_client.OpenRead(new Uri(url, UriKind.RelativeOrAbsolute)); ;
                StreamReader reader = new StreamReader(data);
                response.Message = reader.ReadToEnd();
                data.Close();
                reader.Close();
                response.IsSuccess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }
            return response;
        }
        public APIResponse Post(string url, object body, Dictionary<string, object> headers)
        {
            APIResponse response = new APIResponse { IsSuccess = false, Message = "" };
            try
            {
                WebClient m_client = new WebClient();
                m_client.Headers = FormHeaders(ConvertToDictionary(headers));
                m_client.Encoding = System.Text.Encoding.UTF8;
                response.Message = m_client.UploadString(new Uri(url, UriKind.RelativeOrAbsolute), "POST", Newtonsoft.Json.JsonConvert.SerializeObject(body));
                response.IsSuccess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }
            return response;
        }
        private static Dictionary<string, string> ConvertToDictionary(Dictionary<string, object> headers)
        {
            Dictionary<string, string> data = new Dictionary<string, string>();
            foreach (var kv in headers)
            {
                data.Add(kv.Key, Convert.ToString(kv.Value));
            }
            return data;
        }

        private static WebHeaderCollection FormHeaders(Dictionary<string, string> dictionary)
        {
            WebHeaderCollection headerCollection = new WebHeaderCollection();
            foreach (KeyValuePair<string, string> entry in dictionary)
                headerCollection[entry.Key] = entry.Value;

            return headerCollection;
        }
    }
}
