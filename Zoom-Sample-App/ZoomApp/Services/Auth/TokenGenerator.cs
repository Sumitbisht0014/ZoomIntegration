using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using ZoomApp.Models;

namespace ZoomApp.Services.Auth
{
    public class TokenGenerator
    {
        static readonly char[] padding = { '=' };

        public static string GenerateToken(string apiKey, string apiSecret, string meetingNumber, string role)
        {
            Console.WriteLine("Zoom copyright!");
            Console.WriteLine("generate websdk token!");
            //string apiKey = "apiKey";
            //string apiSecret = "apiSecret";
            //string meetingNumber = "";
            String ts = (ToTimestamp(DateTime.UtcNow.ToUniversalTime()) - 30000).ToString();
            //string role = "1";
            string token = GenerateToken(apiKey, apiSecret, meetingNumber, ts, role);
            Console.WriteLine(token);
            return token;
        }

        public static long ToTimestamp(DateTime value)
        {
            long epoch = (value.Ticks - 621355968000000000) / 10000;
            return epoch;
        }

        private static string GenerateToken(string apiKey, string apiSecret, string meetingNumber, string timestamp, string role)
        {
            string message = String.Format("{0}{1}{2}{3}", apiKey, meetingNumber, timestamp, role);
            apiSecret = apiSecret ?? "";
            var encoding = new System.Text.ASCIIEncoding();
            byte[] keyByte = encoding.GetBytes(apiSecret);
            byte[] messageBytesTest = encoding.GetBytes(message);
            string msgHashPreHmac = System.Convert.ToBase64String(messageBytesTest);
            byte[] messageBytes = encoding.GetBytes(msgHashPreHmac);
            using (var hmacsha256 = new HMACSHA256(keyByte))
            {
                byte[] hashmessage = hmacsha256.ComputeHash(messageBytes);
                string msgHash = System.Convert.ToBase64String(hashmessage);
                string token = String.Format("{0}.{1}.{2}.{3}.{4}", apiKey, meetingNumber, timestamp, role, msgHash);
                var tokenBytes = System.Text.Encoding.UTF8.GetBytes(token);
                return System.Convert.ToBase64String(tokenBytes).TrimEnd(padding);
            }
        }
    }
}
