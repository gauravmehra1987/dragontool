using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Combobulator.Models;
using Combobulator.Common;
using Combobulator.Business.ViewModels;
using Combobulator.Common.Extensions;
using Newtonsoft.Json;
using Combobulator.Helpers;

namespace Combobulator.ApiControllers
{
    public class PostcodeLookUpController : BaseController
    {
        [DeflateCompression]
        public List<PostcodeLookUp> Get(string postcode)
        {
            bool isCacheEnabled;
            bool.TryParse(Combobulator.Common.Config.CacheEnabled, out isCacheEnabled);
            if (isCacheEnabled)
            {
                //Check Cached Result
                if (Cache.IsInCache("MC-POSTCODELOOKUP-" + postcode))
                {
                    return Cache.GetFromCache<List<PostcodeLookUp>>("MC-POSTCODELOOKUP-" + postcode);
                }
            }

            /*
            // Check Database
            var postcodeData = null;
            if (postcodeData.Any())
            {
                double time;
                var isParsed = double.TryParse(Combobulator.Common.Config.CacheExpiration, out time);
                if (!isParsed)
                    return postcodeData;

                if (isCacheEnabled)
                {
                    Cache.SaveToCache("MC-POSTCODELOOKUP-" + postcode, postcodeData, DateTimeOffset.Now.AddSeconds(time));
                }
                return postcodeData;
            }
            else
            {
            */
                //Make Grass Roots API WebRequest
                var request = new RequestData();

                var uri = new Uri(Common.Config.PostcodeApi)
                    .AddParameter("postcode", postcode)
                    .AddParameter("application", Common.Config.PostcodeApp);

                var json = request.GetData(uri.ToString());
                if (!String.IsNullOrEmpty(json))
                {
                    var postcodeApi = (PostcodeLookUpApiViewModel)JsonConvert.DeserializeObject(json, typeof(PostcodeLookUpApiViewModel));

                    //Save Result to DB
                    foreach (var address in postcodeApi.Addresses)
                    {
                        address.Postcode = postcode;
                    }

                    if (!isCacheEnabled)
                        return postcodeApi.Addresses;

                    double time;
                    var isParsed = double.TryParse(Combobulator.Common.Config.CacheExpiration, out time);
                    if (!isParsed)
                        Cache.SaveToCache("MC-POSTCODELOOKUP-" + postcode, postcodeApi.Addresses, DateTimeOffset.Now.AddSeconds(time));
                    return postcodeApi.Addresses;
                }
                else
                {
                    return null;
                }
            /*
            }
            */
        }
    }
}
