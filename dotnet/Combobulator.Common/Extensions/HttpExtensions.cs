using System;
using System.Collections.Specialized;
using System.Text;
using System.Web;

namespace Combobulator.Common.Extensions
{
    public static class HttpExtensions
    {
        /// <summary>
        /// Adds the specified parameter to the Query String.
        /// </summary>
        /// <param name="uri"></param>
        /// <param name="name">Name of the parameter to add.</param>
        /// <param name="value">Value for the parameter to add.</param>
        /// <returns>Url with added parameter.</returns>
        public static Uri AddParameter(this Uri uri, string name, string value)
        {
            var ub = new UriBuilder(uri);
            //NameValueCollection httpValueCollection = HttpUtility.ParseQueryString(uri.Query, Encoding.UTF8);
            var httpValueCollection = HttpUtility.ParseQueryString(uri.Query);
            httpValueCollection.Add(name, value);
            ub.Query = HttpUtility.UrlDecode(httpValueCollection.ToString());
            return ub.Uri;
        }
    }
}
