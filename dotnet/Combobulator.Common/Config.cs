using System.Configuration;

namespace Combobulator.Common
{
    public static class Config
    {
        public static string CacheEnabled = ConfigurationManager.AppSettings["ApiCacheEnabled"];

        public static string CacheExpiration = ConfigurationManager.AppSettings["ApiCacheDurationHours"];

        public static string PostcodeApi = ConfigurationManager.AppSettings["PostcodeApi"];

        public static string PostcodeApp = ConfigurationManager.AppSettings["PostcodeApp"];
    }
}
