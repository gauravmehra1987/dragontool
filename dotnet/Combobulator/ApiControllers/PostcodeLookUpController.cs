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
using Combobulator.DAL;
using System.Web.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace Combobulator.ApiControllers
{
    public class PostcodeLookUpController : BaseController
    {
        private CombobulatorDataContext dbContext = new CombobulatorDataContext();

        public List<Models.PostcodeLookUp> Post([FromBody] PostcodeViewModel model)
        {
            bool isCacheEnabled;
            bool.TryParse(Common.Config.CacheEnabled, out isCacheEnabled);
            if (isCacheEnabled)
            {
                //Check Cached Result
                if (Cache.IsInCache("MC-POSTCODELOOKUP-" + model.Postcode))
                {
                    return Cache.GetFromCache<List<Models.PostcodeLookUp>>("MC-POSTCODELOOKUP-" + model.Postcode);
                }
            }

            // Check Database
            var postcodeData = dbContext.GetPostCode(model.Postcode);
            var postcodes = postcodeData.Select(x => new Models.PostcodeLookUp
            {
                Address1 = x.Address1,
                Address2 = x.Address2,
                Address3 = x.Address3,
                Town = x.Town,
                County = x.County,
                Postcode = x.Postcode
            }).ToList();

            if (postcodes.Any())
            {
                double time;
                var isParsed = double.TryParse(Common.Config.CacheExpiration, out time);
                if (!isParsed)
                    return postcodes;

                if (isCacheEnabled)
                {
                    Cache.SaveToCache("MC-POSTCODELOOKUP-" + model.Postcode, postcodes, DateTimeOffset.Now.AddSeconds(time));
                }
                return postcodes;
            }
            else
            {
                //Make Grass Roots API WebRequest
                var request = new RequestData();
                var uri = new Uri(Common.Config.PostcodeApi)
                    .AddParameter("postcode", model.Postcode)
                    .AddParameter("application", Common.Config.PostcodeApp);

                var json = request.GetData(uri.ToString());
                if (!String.IsNullOrEmpty(json))
                {
                    var postcodeApi = (PostcodeLookUpApiViewModel)JsonConvert.DeserializeObject(json, typeof(PostcodeLookUpApiViewModel));

                    //Save Result to DB
                    foreach (var address in postcodeApi.Addresses)
                    {
                        address.Postcode = model.Postcode;
                    }

                    if (!isCacheEnabled)
                        return postcodeApi.Addresses;

                    double time;
                    var isParsed = double.TryParse(Common.Config.CacheExpiration, out time);
                    if (!isParsed)
                        Cache.SaveToCache("MC-POSTCODELOOKUP-" + model.Postcode, postcodeApi.Addresses, DateTimeOffset.Now.AddSeconds(time));
                    return postcodeApi.Addresses;
                }
                else
                {
                    return null;
                }
            }
        }
    }
}
