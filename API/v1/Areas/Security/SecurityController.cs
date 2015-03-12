using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace API.Areas.Security
{
    /// <summary>
    /// Security Controller to grant JWT to Valid User's
    /// </summary>
    public class SecurityController : Karma.REST.RestController
    {

        /// <summary>
        /// Create a token for a Valid User
        /// </summary>
        /// <param name="user">Datos del usuario para autenticar</param>
        /// <returns></returns>
        public Karma.Security.Oauth.Jwt.Wrapper Post([FromBody]Models.Security user)
        {
            //------------------------------------------------------------------------------------------------------------------------
            //GUARD EXCEPTION
            Karma.Exception.RestException.Guard(() => user == null, "EMPTY_BODY", API.Resources.Errors.ResourceManager);
            Karma.Exception.RestException.Guard(() => user.username == null, "EMPTY_USERNAME", API.Resources.Errors.ResourceManager);
            Karma.Exception.RestException.Guard(() => user.password == null, "EMPTY_PASSWORD", API.Resources.Errors.ResourceManager);
            //------------------------------------------------------------------------------------------------------------------------

            List<System.Security.Claims.Claim> claims = new List<System.Security.Claims.Claim>();

            claims.Add(new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Email, "dmunoz@valentys.com"));
            claims.Add(new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.PrimarySid, "dmunoz"));
            claims.Add(new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Name, "David Antonio Muñoz Gaete"));
            claims.Add(new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Role, "Role 1"));
            claims.Add(new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Role, "Role 1"));
            claims.Add(new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Role, "Role 2"));
            claims.Add(new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Role, "Role 3"));
            claims.Add(new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Role, "Role 4"));


            return Karma.Security.Oauth.Jwt.Manager.CreateToken(claims, DateTime.Now.AddMinutes(10));
        }
    }
}