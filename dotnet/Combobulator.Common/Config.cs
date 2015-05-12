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

        public static string Host = ConfigurationManager.AppSettings["EmailHost"];

        public static string Username = ConfigurationManager.AppSettings["EmailUsername"];

        public static string Password = ConfigurationManager.AppSettings["EmailPassword"];

        public static int Port = Convert.ToInt32(ConfigurationManager.AppSettings["EmailPort"]);

        public static string FromAddress = ConfigurationManager.AppSettings["EmailFromAddress"];

        public static string FromName = ConfigurationManager.AppSettings["EmailFromName"];

        public static string AssetUrl = ConfigurationManager.AppSettings["EmailAssetUrl"];

        public static string EmailAddressTo = ConfigurationManager.AppSettings["EmailAddressTo"];

        public static string EmailCustomerDetailsSubject = ConfigurationManager.AppSettings["EmailCustomerDetailsSubject"];

        public static string EmailMeResultsSubject = ConfigurationManager.AppSettings["EmailMeResultsSubject"];

        public static string EmailCarAssetsLocation = ConfigurationManager.AppSettings["Email.CarAssetsLocation"];

        public static string EmailAssetsLocation = ConfigurationManager.AppSettings["Email.AssetsLocation"];

        public static string EmailAssetsDomain = ConfigurationManager.AppSettings["Email.AssetsDomain"];

        public static string EmailMeResultsTemplate = ConfigurationManager.AppSettings["EmailMeResultsTemplate"];

        public static string EmailCustomerResultsTemplate = ConfigurationManager.AppSettings["EmailCustomerDetailsTemplate"];

        public static string PostcodeExpression = @"^(GIR ?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]([0-9ABEHMNPRV-Y])?)|[0-9][A-HJKPS-UW]) ?[0-9][ABD-HJLNP-UW-Z]{2})$";

        public static string PhoneExpression = @"^(((\+44\s?|0044\s?)?|(\(?0))((2[03489]\)?\s?\d{4}\s?\d{4})|(1[23456789]1\)?\s?\d{3}\s?\d{4})|(1[23456789][234578][0234679]\)?\s?\d{6})|(1[2579][0245][0467]\)?\s?\d{5})|(11[345678]\)?\s?\d{3}\s?\d{4})|(1[35679][234689]\s?[46789][234567]\)?\s?\d{4,5})|([389]\d{2}\s?\d{3}\s?\d{4})|([57][0-9]\s?\d{4}\s?\d{4})|(500\s?\d{6})|(7[456789]\d{2}\s?\d{6})))$";

        public static string NameExpression = @"^[a-zA-Z]'?([a-zA-Z]|\.| |-)+$";

        public static string EmailExpression = @"^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$";

        public static string Brand = ConfigurationManager.AppSettings["Brand"];

        public static string GrassRootsPDICode = ConfigurationManager.AppSettings["GrassRootsPDICode"];
    }
}
