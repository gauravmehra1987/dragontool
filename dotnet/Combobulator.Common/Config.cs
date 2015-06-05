using System;
using System.Configuration;

namespace Combobulator.Common
{
    public static class Config
    {
        public static string CacheEnabled = ConfigurationManager.AppSettings["Cache.ApiCacheEnabled"];

        public static string CacheExpiration = ConfigurationManager.AppSettings["Cache.ApiCacheDuration"];

        public static string PostcodeApi = ConfigurationManager.AppSettings["PostcodeApi"];

        public static string PostcodeApp = ConfigurationManager.AppSettings["PostcodeApp"];

        public static string GoogleMapsApi = ConfigurationManager.AppSettings["Google.MapsAPI"];

        public static string DealerApi = ConfigurationManager.AppSettings["DealerAPI"];

        public static string DealerApplication = ConfigurationManager.AppSettings["DealerApplication"];

        public static string DealerCategory = ConfigurationManager.AppSettings["DealerCategory"];

        public static string DealerMaxTotal = ConfigurationManager.AppSettings["DealerMaxTotal"];
        
        public static string SystemId = ConfigurationManager.AppSettings["FiscSystemId"];

        public static string Random = ConfigurationManager.AppSettings["FiscRandom"];

        public static string SecretKey = ConfigurationManager.AppSettings["FiscSecretKey"];

        public static string HostUrl = ConfigurationManager.AppSettings["FiscURL"];

        public static string GrassRootsHostUrl = ConfigurationManager.AppSettings["GrassRootsURL"];

        public static string GrassRootsAppName = ConfigurationManager.AppSettings["GrassRootsAppName"];

        public static string Host = ConfigurationManager.AppSettings["Email.Host"];

        public static string Username = ConfigurationManager.AppSettings["Email.Username"];

        public static string Password = ConfigurationManager.AppSettings["Email.Password"];

        public static int Port = Convert.ToInt32(ConfigurationManager.AppSettings["Email.Port"]);

        public static string FromAddress = ConfigurationManager.AppSettings["Email.FromAddress"];

        public static string FromName = ConfigurationManager.AppSettings["Email.FromName"];

        public static string AssetUrl = ConfigurationManager.AppSettings["Email.AssetUrl"];

        public static string EmailAddressTo = ConfigurationManager.AppSettings["Email.AddressTo"];

        public static string EmailMeResultsSubject = ConfigurationManager.AppSettings["Email.Subject"];

        public static string EmailCarAssetsLocation = ConfigurationManager.AppSettings["Email.CarAssetsLocation"];

        public static string EmailAssetsLocation = ConfigurationManager.AppSettings["Email.AssetsLocation"];

        public static string EmailAssetsDomain = ConfigurationManager.AppSettings["Email.AssetsDomain"];

        public static string EmailTextTemplate = ConfigurationManager.AppSettings["Email.TextTemplate"];

        public static string EmailHTMLTemplate = ConfigurationManager.AppSettings["Email.HTMLTemplate"];

        public static string PostcodeExpression = @"^(GIR ?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]([0-9ABEHMNPRV-Y])?)|[0-9][A-HJKPS-UW]) ?[0-9][ABD-HJLNP-UW-Z]{2})$";

        public static string PhoneExpression = @"^(((\+44)?(\(0\))?)|0)[127]\d{9}$";

        public static string NameExpression = @"^[a-zA-Z]'?([a-zA-Z]|\.| |-)+$";

        public static string EmailExpression = @"^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$";

        public static string Brand = ConfigurationManager.AppSettings["Brand"];

        public static string GrassRootsPDICode = ConfigurationManager.AppSettings["GrassRootsPDICode"];
    }
}
