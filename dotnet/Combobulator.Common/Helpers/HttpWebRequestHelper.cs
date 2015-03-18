using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Combobulator.Common.Helpers
{
    public static class HttpWebRequestHelper
    {
        private static string FormContentType = "application/x-www-form-urlencoded";
        private static string XMLContentType = "text/xml";
        private static string POST = "POST";

        private static string FormatPostParameters(NameValueCollection nameValueCollection)
        {
            var sb = new StringBuilder();
            foreach (string key in nameValueCollection)
            {
                sb.Append(key + "=" + HttpUtility.UrlEncode(nameValueCollection[key]) + "&");
            }
            sb.Length = sb.Length - 1;
            return sb.ToString();
        }

        private static string FormatPostParameters(Dictionary<string, string> parameters)
        {
            var sb = new StringBuilder();
            foreach (var key in parameters.Keys)
            {
                sb.Append(HttpUtility.UrlEncode(key) + "=" + HttpUtility.UrlEncode(parameters[key]) + "&");
            }
            sb.Length = sb.Length - 1;
            return sb.ToString();
        }

        public static HttpWebResponse SendFormPostRequest(string url, Dictionary<string, string> parameters)
        {
            var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
            httpWebRequest.ContentType = FormContentType;
            httpWebRequest.Method = POST;

            var postData = FormatPostParameters(parameters);

            var requestBytes = Encoding.UTF8.GetBytes(postData);

            httpWebRequest.ContentLength = requestBytes.Length;

            using (var requestStream = httpWebRequest.GetRequestStream())
            {
                requestStream.Write(requestBytes, 0, requestBytes.Length);
                requestStream.Close();
            }

            var responseTask = Task.Factory.FromAsync<WebResponse>(httpWebRequest.BeginGetResponse, httpWebRequest.EndGetResponse, null);
            return (HttpWebResponse)responseTask.Result;
        }
        public static HttpWebResponse SendNonFormPostRequest(string data, string url)
        {
            var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
            httpWebRequest.ContentType = XMLContentType;
            httpWebRequest.Method = POST;
            httpWebRequest.KeepAlive = false;
            httpWebRequest.Timeout = 500000;

            var sw = new StreamWriter(httpWebRequest.GetRequestStream());
            sw.WriteLine(data);
            sw.Close();

            var responseTask = Task.Factory.FromAsync<WebResponse>(httpWebRequest.BeginGetResponse, httpWebRequest.EndGetResponse, null);
            return (HttpWebResponse)responseTask.Result;
        }

        public static HttpWebResponse MakeRequest(string url)
        {
            var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
            httpWebRequest.ContentType = XMLContentType;
            httpWebRequest.Method = "GET";
            httpWebRequest.KeepAlive = false;
            httpWebRequest.Timeout = 500000;

            var responseTask = Task.Factory.FromAsync<WebResponse>(httpWebRequest.BeginGetResponse, httpWebRequest.EndGetResponse, null);
            return (HttpWebResponse)responseTask.Result;
        }

        public static string GetHttpWebResponseData(HttpWebResponse response)
        {
            var data = string.Empty;
            if (response != null)
            {
                var incomingStreamReader = new StreamReader(response.GetResponseStream());
                data = incomingStreamReader.ReadToEnd();
                incomingStreamReader.Close();
                response.GetResponseStream().Close();
            }
            return data;
        }
    }
}
