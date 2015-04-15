using System;
using System.Net.Http.Formatting;
using System.Reflection;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web.Script.Serialization;
using Combobulator.Config;
using Combobulator.Controllers;
using Combobulator.Helpers;
using log4net;
using log4net.Config;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

[assembly: XmlConfigurator(Watch = true)]

namespace Combobulator
{
    public class MvcApplication : HttpApplication
    {
        //Set Logging
        protected static readonly ILog Log = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);

        protected void Application_Start()
        {
            GlobalConfiguration.Configuration.Filters.Add(new MyExceptionFilter());
            AreaRegistration.RegisterAllAreas();
            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            CarAutoMapperConfig.Configure();

            // JSON Formatting
            var jsonFormatter = new JsonMediaTypeFormatter();
            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.Formatting = Formatting.Indented;
            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            GlobalConfiguration.Configuration.Services.Replace(typeof(IContentNegotiator), new JsonContentNegotiator(jsonFormatter));
        }

        protected void Application_Error(object sender, EventArgs e)
        {
            var exception = Server.GetLastError();
            Log.Error(exception);

            Response.Clear();

            if (exception is HttpRequestValidationException)
            {
                var isAjaxCall = string.Equals("XMLHttpRequest", Context.Request.Headers["x-requested-with"], StringComparison.OrdinalIgnoreCase);
                Context.ClearError();
                if (isAjaxCall)
                {
                    Context.Response.ContentType = "application/json";
                    Context.Response.StatusCode = 500;
                    Context.Response.Write(new JavaScriptSerializer().Serialize(new {error = "error"}));
                }
            }
            else
            {

                var httpException = exception as HttpException;

                var routeData = new RouteData();
                routeData.Values.Add("controller", "Error");

                if (httpException == null)
                {
                    routeData.Values.Add("action", "Index");
                }
                else //It's an Http Exception, Let's handle it.
                {
                    switch (httpException.GetHttpCode())
                    {
                        case 404:
                            // Page not found.
                            routeData.Values.Add("action", "HttpError404");
                            break;
                        case 500:
                            // Server error.
                            routeData.Values.Add("action", "HttpError500");
                            break;

                        // Here you can handle Views to other error codes.
                        // I choose a General error template  
                        default:
                            routeData.Values.Add("action", "Index");
                            break;
                    }
                }

                // Pass exception details to the target error View.
                routeData.Values.Add("error", exception);

                // Clear the error on server.
                Server.ClearError();

                // Avoid IIS7 getting in the middle
                Response.TrySkipIisCustomErrors = true;

                // Call target Controller and pass the routeData.
                IController errorController = new ErrorController();
                errorController.Execute(new RequestContext(new HttpContextWrapper(Context), routeData));
            }
        }
    }
}