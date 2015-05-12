using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using Combobulator.Common;
using Combobulator.Business.ViewModels;
using Combobulator.Common.Extensions;
using Newtonsoft.Json;
using Combobulator.Helpers;
using Combobulator.Data;
using Combobulator.Common.Helpers;

namespace Combobulator.ApiControllers
{
    public class PostcodeLookUpController : BaseController
    {
        private readonly CombobulatorDataContext _dbContext = new CombobulatorDataContext();

        /// <summary>
        /// Posts the specified model and returns a list of addresses.
        /// </summary>
        /// <param name="model">The form collection containing a postcode.</param>
        /// <returns>A list of addresses from the given postcode.</returns>
        [DeflateCompression]
        public HttpResponseMessage Get(string postcode)
        {
            if (String.IsNullOrEmpty(postcode))
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, string.Format("Postcode must not be null."));

            var regex = new Regex(Common.Config.PostcodeExpression);
            var match = regex.Match(postcode.ToUpper());
            if (match.Success)
            {
                var postcodeInfo = postcode.Replace(" ", "").ToUpper();

                bool isCacheEnabled;
                bool.TryParse(Common.Config.CacheEnabled, out isCacheEnabled);
                if (isCacheEnabled)
                {
                    //Check Cached Result
                    if (Cache.IsInCache("MC-POSTCODELOOKUP-" + postcodeInfo))
                    {
                        var list = Cache.GetFromCache<List<Models.PostcodeLookUp>>("MC-POSTCODELOOKUP-" + postcodeInfo);
                        return ResponseHelper.FormatMessage(JsonConvert.SerializeObject(list));
                    }
                }

                // Check Database
                var postcodeData = _dbContext.GetPostCode(postcodeInfo).ToList();
                if (postcodeData.Any())
                {
                    var postcodes = postcodeData.Select(x => new Models.PostcodeLookUp
                    {
                        Address1 = x.Address1,
                        Address2 = x.Address2,
                        Address3 = x.Address3,
                        Town = x.Town,
                        County = x.County,
                        Postcode = x.Postcode.NormalizePostcode().ToUpper()
                    }).ToList();

                    double time;
                    var isParsed = double.TryParse(Common.Config.CacheExpiration, out time);
                    if (!isParsed)
                        return ResponseHelper.FormatMessage(JsonConvert.SerializeObject(postcodes));

                    if (isCacheEnabled)
                    {
                        Cache.SaveToCache("MC-POSTCODELOOKUP-" + postcodeInfo, postcodes,
                            DateTimeOffset.Now.AddSeconds(time));
                    }
                    return ResponseHelper.FormatMessage(JsonConvert.SerializeObject(postcodes));
                }
                else
                {
                    //Make Grass Roots API WebRequest
                    var uri = new Uri(Common.Config.PostcodeApi)
                        .AddParameter("postcode", postcodeInfo.ToUpper())
                        .AddParameter("application", Common.Config.PostcodeApp);

                    var response = HttpWebRequestHelper.MakeRequest(uri.ToString());
                    var json = HttpWebRequestHelper.GetHttpWebResponseData(response);

                    if (!String.IsNullOrEmpty(json))
                    {
                        var postcodeApi =
                            (PostcodeLookUpApiViewModel)
                                JsonConvert.DeserializeObject(json, typeof (PostcodeLookUpApiViewModel));

                        //Save Result to DB
                        foreach (var address in postcodeApi.Addresses)
                        {
                            address.Postcode = postcode.ToUpper();
                            _dbContext.PostcodeLookUps.InsertOnSubmit(new PostcodeLookUp
                            {
                                Address1 = address.Address1,
                                Address2 = address.Address2,
                                Address3 = address.Address3,
                                Town = address.Town,
                                County = address.County,
                                Postcode = postcode.ToUpper()
                            });
                        }
                        _dbContext.SubmitChanges();

                        if (!isCacheEnabled)
                            return ResponseHelper.FormatMessage(JsonConvert.SerializeObject(postcodeApi.Addresses));

                        double time;
                        var isParsed = double.TryParse(Common.Config.CacheExpiration, out time);
                        if (!isParsed)
                            Cache.SaveToCache("MC-POSTCODELOOKUP-" + postcodeInfo, postcodeApi.Addresses,
                                DateTimeOffset.Now.AddSeconds(time));
                        return ResponseHelper.FormatMessage(JsonConvert.SerializeObject(postcodeApi.Addresses));
                    }
                    else
                    {
                        return ResponseHelper.FormatMessage(JsonConvert.SerializeObject(""));
                    }
                }
            }
            var message = string.Format("Postcode is not valid.");
            return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, message);
        }
    }
}
