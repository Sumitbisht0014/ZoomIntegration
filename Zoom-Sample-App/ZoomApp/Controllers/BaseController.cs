using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ZoomApp.Models;
using ZoomApp.Services.Auth;

namespace ZoomApp.Controllers
{
    [Route("api/v1/[controller]")]
    public class BaseController : ControllerBase
    {
        private readonly AppSettings _appSettings;
        public BaseController(AppSettings appSettings)
        {
            _appSettings = appSettings;
        }

        [HttpGet("[action]")]
        public string GetSignature(string meetingNumber, string role)
        {
            return TokenGenerator.GenerateToken(_appSettings.ApiKey, _appSettings.ApiSecretKey, meetingNumber, role);
        }

        [HttpGet("[action]")]
        public string GetToken()
        {
            return ZoomToken.ZoomJWTTokens(_appSettings.ApiKey, _appSettings.ApiSecretKey);
        }
    }

    public static class ZoomToken
    {
        public static string ZoomJWTTokens(string ZoomApiKey, string ZoomApiSecret)
        {
            DateTime Expiry = DateTime.UtcNow.AddMinutes(5);
            string ApiKey = ZoomApiKey;
            string ApiSecret = ZoomApiSecret;

            int ts = (int)(Expiry - new DateTime(1970, 1, 1)).TotalSeconds;

            // Create Security key  using private key above:
            // note that latest version of JWT using Microsoft namespace instead of System
            var securityKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(Encoding.UTF8.GetBytes(ApiSecret));

            // Also note that securityKey length should be >256b
            // so you have to make sure that your private key has a proper length
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            //Finally create a Token
            var header = new JwtHeader(credentials);

            //Zoom Required Payload
            var payload = new JwtPayload
            {
                { "iss", ApiKey},
                { "exp", ts },
            };

            var secToken = new JwtSecurityToken(header, payload);
            var handler = new JwtSecurityTokenHandler();

            // Token to String so you can use it in your client
            var tokenString = handler.WriteToken(secToken);

            return tokenString;
        }
    }
}
