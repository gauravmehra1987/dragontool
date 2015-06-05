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
using System.Web.Http;
using Combobulator.Common.Helpers;

namespace Combobulator.ApiControllers
{
    public class DealerLookUpController : BaseController
    {
        private readonly CombobulatorDataContext _dbContext = new CombobulatorDataContext();

        /// <summary>
        /// Posts the specified model and returns a list of dealers.
        /// </summary>
        /// <param name="model">The model containing a postcode.</param>
        /// <returns>A list of dealers from the given postcode.</returns>
        [DeflateCompression]
        public HttpResponseMessage Get(string postcode)
        {
            if (String.IsNullOrEmpty(postcode))
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, string.Format("Postcode must not be null."));

            var regex = new Regex(Common.Config.PostcodeExpression);
            var match = regex.Match(postcode.ToUpper());
            if (match.Success)
            {
                var postcodeInfo = postcode.Replace(" ", "");

                bool isCacheEnabled;
                bool.TryParse(Common.Config.CacheEnabled, out isCacheEnabled);
                if (isCacheEnabled)
                {
                    //Check Cached Result
                    if (Cache.IsInCache("MC-DEALERLOOKUP-" + postcodeInfo))
                    {
                        var list = Cache.GetFromCache<List<Models.DealerLookUp>>("MC-DEALERLOOKUP-" + postcodeInfo);
                        return ResponseHelper.FormatMessage(JsonConvert.SerializeObject(list));
                    }
                }

                // Check Database
                var postcodeData = _dbContext.GetDealer(postcodeInfo).ToList();
                if (postcodeData.Any())
                {
                    var dealers = postcodeData.Select(x => new Models.DealerLookUp
                    {
                        DealerId = x.DealerId,
                        Phone = x.Phone,
                        Name = x.Name,
                        Longitude = x.Longitude,
                        Latitude = x.Latitude,
                        Distance = x.Distance,
                        Address = x.Address
                    }).OrderByDescending(x => x.Distance).ToList();

                    double time;
                    var isParsed = double.TryParse(Common.Config.CacheExpiration, out time);
                    if (!isParsed)
                        return ResponseHelper.FormatMessage(JsonConvert.SerializeObject(dealers));

                    if (isCacheEnabled)
                    {
                        Cache.SaveToCache("MC-DEALERLOOKUP-" + postcodeInfo, dealers,
                            DateTimeOffset.Now.AddMinutes(time));
                    }
                    return ResponseHelper.FormatMessage(JsonConvert.SerializeObject(dealers));
                }
                else
                {
                    // Make API WebRequest
                    var googleUri = new Uri(Common.Config.GoogleMapsApi)
                        .AddParameter("address", postcodeInfo)
                        .AddParameter("sensor", "false");
                    var response = HttpWebRequestHelper.MakeRequest(googleUri.ToString(),5000);
                    var json = HttpWebRequestHelper.GetHttpWebResponseData(response);
                    var addresses =
                        (GoogleGeoCodeResponse) JsonConvert.DeserializeObject(json, typeof (GoogleGeoCodeResponse));
                    var location = addresses.results.Select(x => x.geometry.location).SingleOrDefault();

                    if (location == null)
                        return null;

                    var dealerUri = new Uri(Common.Config.DealerApi)
                        .AddParameter("application", Common.Config.DealerApplication)
                        .AddParameter("brand", Common.Config.DealerCategory)
                        .AddParameter("resultcount", Common.Config.DealerMaxTotal)
                        .AddParameter("latitude", location.lat)
                        .AddParameter("longitude", location.lng);
                    var dealerResponse = HttpWebRequestHelper.MakeRequest(dealerUri.ToString(),5000);
                    var feed = HttpWebRequestHelper.GetHttpWebResponseData(dealerResponse);

                    var dealerList = (DealerResponse)JsonConvert.DeserializeObject(feed, typeof(DealerResponse));

                    var viewModel = dealerList.dealers.Select(loc => new Models.DealerLookUp()
                    {
                        Address = loc.address,
                        DealerId = Convert.ToInt32(loc.dealerid),
                        Phone = loc.telephone,
                        Latitude = double.Parse(loc.latitude),
                        Longitude = double.Parse(loc.longitude),
                        Name = loc.name,
                        Distance = double.Parse(loc.distance)
                    }).OrderByDescending(x => x.Distance).ToList();

                    //Save Result to DB
                    foreach (var dealer in viewModel)
                    {
                        _dbContext.Dealers.InsertOnSubmit(new Dealer
                        {
                            Postcode = postcodeInfo,
                            DealerLookUp = new DealerLookUp
                            {
                                Address = dealer.Address,
                                DealerId = dealer.DealerId,
                                Distance = dealer.Distance,
                                Latitude = dealer.Latitude,
                                Longitude = dealer.Longitude,
                                Name = dealer.Name,
                                Phone = dealer.Phone
                            }
                        });
                    }
                    _dbContext.SubmitChanges();

                    if (!isCacheEnabled)
                        return ResponseHelper.FormatMessage(JsonConvert.SerializeObject(viewModel));

                    double time;
                    var isParsed = double.TryParse(Common.Config.CacheExpiration, out time);
                    if (!isParsed)
                        Cache.SaveToCache("MC-DEALERLOOKUP-" + postcodeInfo, viewModel,
                            DateTimeOffset.Now.AddMinutes(time));
                    return ResponseHelper.FormatMessage(JsonConvert.SerializeObject(viewModel));
                }
            }
            var message = string.Format("Postcode is not valid.");
            return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, message);
        }
    }
}