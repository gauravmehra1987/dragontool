using System;
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

        public static string SystemId = ConfigurationManager.AppSettings["FiscSystemId"];
        public static string Random = ConfigurationManager.AppSettings["FiscRandom"];
        public static string SecretKey = ConfigurationManager.AppSettings["FiscSecretKey"];
        public static string HostUrl = ConfigurationManager.AppSettings["FiscURL"];
        public static string GrassRootsHostUrl = ConfigurationManager.AppSettings["GrassRootsURL"];
        public static string GrassRootsAppName = ConfigurationManager.AppSettings["GrassRootsAppName"];

        public static string _host = ConfigurationManager.AppSettings["EmailHost"];
        public static string _username = ConfigurationManager.AppSettings["EmailUsername"];
        public static string _password = ConfigurationManager.AppSettings["EmailPassword"];
        public static int _port = Convert.ToInt32(ConfigurationManager.AppSettings["EmailPort"]);
        public static string _fromAddress = ConfigurationManager.AppSettings["EmailFromAddress"];
        public static string _fromName = ConfigurationManager.AppSettings["EmailFromName"];
        public static string _assetUrl = ConfigurationManager.AppSettings["EmailAssetUrl"];
        public static string _emailAddressTo = ConfigurationManager.AppSettings["EmailAddressTo"];
        public static string _emailCustomerDetailsSubject = ConfigurationManager.AppSettings["EmailCustomerDetailsSubject"];
        public static string _emailMeResultsSubject = ConfigurationManager.AppSettings["EmailMeResultsSubject"];

        public static string _emailMeResultsTemplate = ConfigurationManager.AppSettings["EmailMeResultsTemplate"];
        public static string _emailCustomerResultsTemplate = ConfigurationManager.AppSettings["EmailCustomerDetailsTemplate"];
    }
}
