using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace API.Areas.Administration
{
    /// <summary>
    /// Configuración de la aplicación 
    /// </summary>
    [Karma.Security.Oauth.Jwt.Authorize]
    public class ConfigurationController : Karma.REST.KarmaController<Models.Configuracion>
    {

        /// <summary>
        /// Extrae la configuración del sistema
        /// </summary>
        /// <returns></returns>
        /// <response code="201">Created</response>
        /// <response code="500">Internal Server Error</response>
        [ResponseType(typeof(List<Models.Configuracion>))]
        [Karma.REST.Queryable.Primitive.Mapping.Model(typeof(Models.VIEW_Configuracion))]
        public override IHttpActionResult Get()
        {
            return base.Get();
        }
    }
}