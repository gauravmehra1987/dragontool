using System.Net.Http;
using System.Net.Http.Headers;

namespace Combobulator.Helpers
{
    public static class ResponseHelper
    {
        public static HttpResponseMessage FormatMessage(string json)
        {
            var responseMessage = new HttpResponseMessage();
            var sc = new StringContent(json);
            sc.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            responseMessage.Content = sc;
            return responseMessage;
        }
    }
}