using System.Configuration;

namespace Combobulator.Common
{
    public static class Config
    {
        public static string CacheEnabled = ConfigurationManager.AppSettings["ApiCacheEnabled"];

        public static string CacheExpiration = ConfigurationManager.AppSettings["ApiCacheDurationHours"];

        public static string PostcodeApi = ConfigurationManager.AppSettings["PostcodeApi"];

        public static string PostcodeApp = ConfigurationManager.AppSettings["PostcodeApp"];

        public static string GoogleMapsApi = ConfigurationManager.AppSettings["Google.MapsAPI"];

        public static string DealerApi = ConfigurationManager.AppSettings["DealerAPI"];

        public static string DealerCountry = ConfigurationManager.AppSettings["DealerCountry"];

        public static string DealerCategory = ConfigurationManager.AppSettings["DealerCategory"];

        public static string DealerMaxTotal = ConfigurationManager.AppSettings["DealerMaxTotal"];

        public static string DealerLanguage = ConfigurationManager.AppSettings["DealerLanguage"];
    }
}
