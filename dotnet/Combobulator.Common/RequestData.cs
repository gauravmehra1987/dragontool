using System.IO;
using System.Net;

namespace Combobulator.Common
{
    public class RequestData
    {
        public string GetData(string url)
        {
            var request = WebRequest.Create(url);
            request.Method = WebRequestMethods.Http.Get;
            var response = request.GetResponse();
            var stream = response.GetResponseStream();
            if (stream == null)
                return null;

            var reader = new StreamReader(stream);
            var responseFromServer = reader.ReadToEnd();
            return responseFromServer;
        }
    }
}
