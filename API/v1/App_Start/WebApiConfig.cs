using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Routing;
using System.Web.Services.Description;
using Swashbuckle.Application;

namespace API
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            string route = "v1/{controller}";

            config.Routes.MapHttpRoute("DefaultApiGet", route, new { action = "Get" }, new { httpMethod = new HttpMethodConstraint(HttpMethod.Get) });
            config.Routes.MapHttpRoute("DefaultApiPost", route, new { action = "Post" }, new { httpMethod = new HttpMethodConstraint(HttpMethod.Post) });
            config.Routes.MapHttpRoute("DefaultApiPutWitchAction", route + "/{id}", new { action = "Put", id = RouteParameter.Optional }, new { httpMethod = new HttpMethodConstraint(HttpMethod.Put) });
            config.Routes.MapHttpRoute("DefaultApiWitchAction", route + "/{id}", new { action = "Delete", id = RouteParameter.Optional }, new { httpMethod = new HttpMethodConstraint(HttpMethod.Delete) });

            config.Routes.MapHttpRoute("DefaultApiPut", route, new { action = "Put", id = RouteParameter.Optional }, new { httpMethod = new HttpMethodConstraint(HttpMethod.Put) });
            config.Routes.MapHttpRoute("DefaultApiDelete", route, new { action = "Delete", id = RouteParameter.Optional }, new { httpMethod = new HttpMethodConstraint(HttpMethod.Delete) });


            //SWAGGER PROTOCOL AUTO-GENERATED DOC's
            //https://github.com/domaindrivendev/Swashbuckle

            string XMLComment = System.String.Format(@"{0}\bin\API.XML", System.AppDomain.CurrentDomain.BaseDirectory);
            config.EnableSwagger((c) =>
            {

                //Action Conflict Resolver
                c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());

                //JWT Configuration
                c.ApiKey("api_key")
                    .Description("Bearer JWT Authorization")
                    .Name("Authorization")
                    .In("header");

                //Add JWT Api Key Scheme
                c.OperationFilter<ApiKeyOperationFilter>();

                //Include XML
                c.IncludeXmlComments(XMLComment);
                
                //Basic Configuration
                c.SingleApiVersion("v1", "API Doc's")
                .Contact(cc => cc
                    .Name("David Muñoz Gaete")
                    .Url("http://www.valentys.com")
                    .Email("dmunozgaete@gmail.com"));

            }).EnableSwaggerUi((c) =>{});

            config.Formatters.Add(new API.BrowserJsonFormatter());
        }
    }

    /// <summary>
    /// Find the authorization Attribute and add the API Key
    /// </summary>
    public class ApiKeyOperationFilter : Swashbuckle.Swagger.IOperationFilter
    {

        public void Apply(Swashbuckle.Swagger.Operation operation, Swashbuckle.Swagger.SchemaRegistry schemaRegistry, System.Web.Http.Description.ApiDescription apiDescription)
        {


            if (operation.security == null)
                operation.security = new List<IDictionary<string, IEnumerable<string>>>();

            var oAuthRequirements = new Dictionary<string, IEnumerable<string>>();
            oAuthRequirements.Add("api_key", new List<string>());

            operation.security.Add(oAuthRequirements);



            /*
            var models = dataTypeRegistry.GetModels();
            var parameter = operation.Parameters.FirstOrDefault(x => x.ParamType == "query" && models.ContainsKey(x.Type));

            if (parameter != null)
            {
                var model = models[parameter.Type];

                operation.Parameters.Clear();

                operation.Parameters = model.Properties.Select(x => new Parameter
                {
                    Name = x.Key,
                    Type = x.Value.Type,
                    ParamType = "query",
                    Required = model.Required.Contains(x.Key)
                }).ToList();
            }
            */
        }
    }
}
