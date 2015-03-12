using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace API.Areas.Administration
{
    public class RoleController : Karma.REST.KarmaController<Models.Rol>
    {

        [Karma.REST.Queryable.Primitive.Mapping.Model(typeof(Models.Rol))]
        public override IHttpActionResult Get()
        {
            return base.Get();
        }

       
    }
}