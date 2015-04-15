using System.Net;
using System.Net.Http;
using System.Web.Http.Filters;

namespace Combobulator.Helpers
{
    public class MyExceptionFilter : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext context)
        {
            HttpResponseMessage msg = new HttpResponseMessage(HttpStatusCode.NotFound)
            {
                Content = new StringContent("An unhandled exception was thrown by Web API controller."),
                ReasonPhrase = "An unhandled exception was thrown by Web API controller."
            };
            context.Response = msg;
        }
    }
}