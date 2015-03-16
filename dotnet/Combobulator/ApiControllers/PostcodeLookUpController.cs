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

namespace Combobulator.ApiControllers
{
    public class PostcodeLookUpController : BaseController
    {
        private CombobulatorDataContext dbContext = new CombobulatorDataContext();

        [DeflateCompression]
        public List<Models.PostcodeLookUp> Post([FromBody] PostcodeViewModel model)
        {
            if (String.IsNullOrEmpty(model.Postcode))
                return new List<Models.PostcodeLookUp>();

            var postcode = model.Postcode.Replace(" ", "");

            bool isCacheEnabled;
            bool.TryParse(Common.Config.CacheEnabled, out isCacheEnabled);
            if (isCacheEnabled)
            {
                //Check Cached Result
                if (Cache.IsInCache("MC-POSTCODELOOKUP-" + postcode))
                {
                    return Cache.GetFromCache<List<Models.PostcodeLookUp>>("MC-POSTCODELOOKUP-" + postcode);
                }
            }

            // Check Database
            var postcodeData = dbContext.GetPostCode(postcode);
            var postcodes = postcodeData.Select(x => new Models.PostcodeLookUp
            {
                Address1 = x.Address1,
                Address2 = x.Address2,
                Address3 = x.Address3,
                Town = x.Town,
                County = x.County,
                Postcode = x.Postcode.NormalizePostcode()
            }).ToList();

            if (postcodes.Any())
            {
                double time;
                var isParsed = double.TryParse(Common.Config.CacheExpiration, out time);
                if (!isParsed)
                    return postcodes;

                if (isCacheEnabled)
                {
                    Cache.SaveToCache("MC-POSTCODELOOKUP-" + postcode, postcodes, DateTimeOffset.Now.AddSeconds(time));
                }
                return postcodes;
            }
            else
            {
                //Make Grass Roots API WebRequest
                var uri = new Uri(Common.Config.PostcodeApi)
                    .AddParameter("postcode", postcode)
                    .AddParameter("application", Common.Config.PostcodeApp);

                var response = HttpWebRequestHelper.MakeRequest(uri.ToString());
                string json = HttpWebRequestHelper.GetHttpWebResponseData(response);

                if (!String.IsNullOrEmpty(json))
                {
                    var postcodeApi = (PostcodeLookUpApiViewModel)JsonConvert.DeserializeObject(json, typeof(PostcodeLookUpApiViewModel));

                    //Save Result to DB
                    foreach (var address in postcodeApi.Addresses)
                    {
                        address.Postcode = model.Postcode;
                        dbContext.PostcodeLookUps.InsertOnSubmit(new DAL.PostcodeLookUp {
                            Address1 = address.Address1,
                            Address2 = address.Address2,
                            Address3 = address.Address3,
                            Town = address.Town,
                            County = address.County,
                            Postcode = postcode
                        });
                    }
                    dbContext.SubmitChanges();

                    if (!isCacheEnabled)
                        return postcodeApi.Addresses;

                    double time;
                    var isParsed = double.TryParse(Common.Config.CacheExpiration, out time);
                    if (!isParsed)
                        Cache.SaveToCache("MC-POSTCODELOOKUP-" + postcode, postcodeApi.Addresses, DateTimeOffset.Now.AddSeconds(time));
                    return postcodeApi.Addresses;
                }
                else
                {
                    return new List<Models.PostcodeLookUp>();
                }
            }
        }
    }
}
