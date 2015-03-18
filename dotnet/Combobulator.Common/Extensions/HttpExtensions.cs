using System;
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
            var httpValueCollection = HttpUtility.ParseQueryString(uri.Query);
            httpValueCollection.Add(name, value);
            ub.Query = httpValueCollection.ToString();
            return ub.Uri;
        }
    }
}
