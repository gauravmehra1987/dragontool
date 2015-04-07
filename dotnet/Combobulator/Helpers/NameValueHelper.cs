using System.Collections.Specialized;
using System.Net.Http.Formatting;

namespace Combobulator.Helpers
{
    public static class NameValueHelper
    {
        /// <summary>
        /// Copy the values contained in the given FormDataCollection into 
        /// a NameValueCollection instance.
        /// </summary>
        /// <param name="formDataCollection">The FormDataCollection instance. (required, but can be empty)</param>
        /// <returns>The NameValueCollection. Never returned null, but may be empty.</returns>
        public static NameValueCollection Convert(FormDataCollection formDataCollection)
        {
            var pairs = formDataCollection.GetEnumerator();
            var collection = new NameValueCollection();
            while (pairs.MoveNext())
            {
                var pair = pairs.Current;
                var key = pair.Key.Replace("form[", "").Replace("input[", "").Replace("options[", "").Replace("localDealer[", "").Replace("]", "");
                collection.Add(key, pair.Value);
            }
            return collection;
        }
    }
}