using System;
using System.Globalization;
using System.Web;

namespace Combobulator.Helpers
{
    public static class CookieHelper
    {
        public static void SetCookie(string name)
        {
            var myCookie = HttpContext.Current.Request.Cookies[name] ?? new HttpCookie(name);
            myCookie.Values["LastVisit"] = DateTime.Now.ToString(CultureInfo.InvariantCulture);
            myCookie.Expires = DateTime.Now.AddDays(365);
            HttpContext.Current.Response.Cookies.Add(myCookie);
        }

        public static string GetCookie(string name)
        {
            var myCookie = HttpContext.Current.Request.Cookies[name];
            if (myCookie == null)
                return null;

            return myCookie.Value;
        }
    }
}