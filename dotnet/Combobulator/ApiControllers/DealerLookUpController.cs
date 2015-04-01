using System;
using System.Collections.Generic;
using System.Linq;
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
        public List<Models.DealerLookUp> Post([FromBody] DealerViewModel model)
        {
            if (String.IsNullOrEmpty(model.Postcode))
                return new List<Models.DealerLookUp>();
            
            var postcode = model.Postcode.Replace(" ", "");

            bool isCacheEnabled;
            bool.TryParse(Common.Config.CacheEnabled, out isCacheEnabled);
            if (isCacheEnabled)
            {
                //Check Cached Result
                if (Cache.IsInCache("MC-DEALERLOOKUP-" + postcode))
                {
                    return Cache.GetFromCache<List<Models.DealerLookUp>>("MC-DEALERLOOKUP-" + postcode);
                }
            }

            // Check Database
            var postcodeData = _dbContext.GetDealer(postcode);
            var dealers = postcodeData.Select(x => new Models.DealerLookUp
            {
                DealerId = x.DealerId,
                Country = x.Country,
                Url = x.Url,
                Town = x.Town,
                Phone = x.Phone,
                Name = x.Name,
                Longitude = x.Longitude,
                Latitude = x.Latitude,
                Fax = x.Fax,
                Email = x.Email,
                Distance = x.Distance,
                County = x.County,
                Address = x.Address,
                Postcode = x.Postcode.NormalizePostcode()
            }).ToList();

            if (dealers.Any())
            {
                double time;
                var isParsed = double.TryParse(Common.Config.CacheExpiration, out time);
                if (!isParsed)
                    return dealers;

                if (isCacheEnabled)
                {
                    Cache.SaveToCache("MC-DEALERLOOKUP-" + postcode, dealers, DateTimeOffset.Now.AddSeconds(time));
                }
                return dealers;
            }
            else
            {
                // Make API WebRequest
                var googleUri = new Uri(Common.Config.GoogleMapsApi)
                    .AddParameter("address", postcode)
                    .AddParameter("sensor", "false");
                var response = HttpWebRequestHelper.MakeRequest(googleUri.ToString());
                var json = HttpWebRequestHelper.GetHttpWebResponseData(response);
                var addresses = (GoogleGeoCodeResponse)JsonConvert.DeserializeObject(json, typeof(GoogleGeoCodeResponse));
                var location = addresses.results.Select(x => x.geometry.location).SingleOrDefault();

                if (location == null)
                    return null;

                var dealerUri = new Uri(Common.Config.DealerApi)
                    .AddParameter("country", Common.Config.DealerCountry)
                    .AddParameter("category", Common.Config.DealerCategory)
                    .AddParameter("maxResults", Common.Config.DealerMaxTotal)
                    .AddParameter("language", Common.Config.DealerLanguage)
                    .AddParameter("lat", location.lat)
                    .AddParameter("lng", location.lng);
                var dealerResponse = HttpWebRequestHelper.MakeRequest(dealerUri.ToString());
                var feed = HttpWebRequestHelper.GetHttpWebResponseData(dealerResponse);

                var start = feed.IndexOf("(", StringComparison.Ordinal);
                var end = feed.LastIndexOf(")", StringComparison.Ordinal);
                var data = feed.Substring(start + 1, end - start - 1);
                var dealerList = (DealerResponse)JsonConvert.DeserializeObject(data, typeof(DealerResponse));

                var viewModel = dealerList.data.pois.Select(loc => new Models.DealerLookUp()
                {
                    Address = loc.street,
                    Country = loc.country,
                    County = loc.state,
                    DealerId = Convert.ToInt32(loc.attributes.distributionPartnerId),
                    Email = loc.attributes.mail,
                    Fax = loc.attributes.fax,
                    Phone = loc.attributes.phone,
                    Latitude = loc.lat,
                    Longitude = loc.lng,
                    Name = loc.name,
                    Town = loc.city,
                    Postcode = loc.postalCode,
                    Distance = loc.dist,
                    Url = loc.attributes.homepage
                }).ToList();

                //Save Result to DB
                foreach (var dealer in viewModel)
                {
                    _dbContext.Dealers.InsertOnSubmit(new Dealer
                    {
                        Postcode = postcode,
                        DealerLookUp = new DealerLookUp
                        {
                            Address = dealer.Address,
                            Postcode = dealer.Postcode,
                            Country = dealer.Country,
                            County = dealer.County,
                            DealerId = dealer.DealerId,
                            Distance = dealer.Distance,
                            Email = dealer.Email,
                            Fax = dealer.Fax,
                            Latitude = dealer.Latitude,
                            Longitude = dealer.Longitude,
                            Name = dealer.Name,
                            Phone = dealer.Phone,
                            Town = dealer.Town,
                            Url = dealer.Url
                        }
                    });
                    _dbContext.SubmitChanges();
                }

                if (!isCacheEnabled)
                    return viewModel;

                double time;
                var isParsed = double.TryParse(Common.Config.CacheExpiration, out time);
                if (!isParsed)
                    Cache.SaveToCache("MC-DEALERLOOKUP-" + postcode, viewModel, DateTimeOffset.Now.AddSeconds(time));
                return viewModel;
            }
        }

        [DeflateCompression]
        public List<Models.DealerLookUp> Get([FromBody] string postcode)
        {
            if (String.IsNullOrEmpty(postcode))
                return new List<Models.DealerLookUp>();

            var postcodeInfo = postcode.Replace(" ", "");

            bool isCacheEnabled;
            bool.TryParse(Common.Config.CacheEnabled, out isCacheEnabled);
            if (isCacheEnabled)
            {
                //Check Cached Result
                if (Cache.IsInCache("MC-DEALERLOOKUP-" + postcode))
                {
                    return Cache.GetFromCache<List<Models.DealerLookUp>>("MC-DEALERLOOKUP-" + postcode);
                }
            }

            // Check Database
            var postcodeData = _dbContext.GetDealer(postcodeInfo);
            var dealers = postcodeData.Select(x => new Models.DealerLookUp
            {
                DealerId = x.DealerId,
                Country = x.Country,
                Url = x.Url,
                Town = x.Town,
                Phone = x.Phone,
                Name = x.Name,
                Longitude = x.Longitude,
                Latitude = x.Latitude,
                Fax = x.Fax,
                Email = x.Email,
                Distance = x.Distance,
                County = x.County,
                Address = x.Address,
                Postcode = x.Postcode.NormalizePostcode()
            }).ToList();

            if (dealers.Any())
            {
                double time;
                var isParsed = double.TryParse(Common.Config.CacheExpiration, out time);
                if (!isParsed)
                    return dealers;

                if (isCacheEnabled)
                {
                    Cache.SaveToCache("MC-DEALERLOOKUP-" + postcodeInfo, dealers, DateTimeOffset.Now.AddSeconds(time));
                }
                return dealers;
            }
            else
            {
                // Make API WebRequest
                var googleUri = new Uri(Common.Config.GoogleMapsApi)
                    .AddParameter("address", postcodeInfo)
                    .AddParameter("sensor", "false");
                var response = HttpWebRequestHelper.MakeRequest(googleUri.ToString());
                var json = HttpWebRequestHelper.GetHttpWebResponseData(response);
                var addresses = (GoogleGeoCodeResponse)JsonConvert.DeserializeObject(json, typeof(GoogleGeoCodeResponse));
                var location = addresses.results.Select(x => x.geometry.location).SingleOrDefault();

                if (location == null)
                    return null;

                var dealerUri = new Uri(Common.Config.DealerApi)
                    .AddParameter("country", Common.Config.DealerCountry)
                    .AddParameter("category", Common.Config.DealerCategory)
                    .AddParameter("maxResults", Common.Config.DealerMaxTotal)
                    .AddParameter("language", Common.Config.DealerLanguage)
                    .AddParameter("lat", location.lat)
                    .AddParameter("lng", location.lng);
                var dealerResponse = HttpWebRequestHelper.MakeRequest(dealerUri.ToString());
                var feed = HttpWebRequestHelper.GetHttpWebResponseData(dealerResponse);

                var start = feed.IndexOf("(", StringComparison.Ordinal);
                var end = feed.LastIndexOf(")", StringComparison.Ordinal);
                var data = feed.Substring(start + 1, end - start - 1);
                var dealerList = (DealerResponse)JsonConvert.DeserializeObject(data, typeof(DealerResponse));

                var viewModel = dealerList.data.pois.Select(loc => new Models.DealerLookUp()
                {
                    Address = loc.street,
                    Country = loc.country,
                    County = loc.state,
                    DealerId = Convert.ToInt32(loc.attributes.distributionPartnerId),
                    Email = loc.attributes.mail,
                    Fax = loc.attributes.fax,
                    Phone = loc.attributes.phone,
                    Latitude = loc.lat,
                    Longitude = loc.lng,
                    Name = loc.name,
                    Town = loc.city,
                    Postcode = loc.postalCode,
                    Distance = loc.dist,
                    Url = loc.attributes.homepage
                }).ToList();

                //Save Result to DB
                foreach (var dealer in viewModel)
                {
                    _dbContext.Dealers.InsertOnSubmit(new Dealer
                    {
                        Postcode = postcodeInfo,
                        DealerLookUp = new DealerLookUp
                        {
                            Address = dealer.Address,
                            Postcode = dealer.Postcode,
                            Country = dealer.Country,
                            County = dealer.County,
                            DealerId = dealer.DealerId,
                            Distance = dealer.Distance,
                            Email = dealer.Email,
                            Fax = dealer.Fax,
                            Latitude = dealer.Latitude,
                            Longitude = dealer.Longitude,
                            Name = dealer.Name,
                            Phone = dealer.Phone,
                            Town = dealer.Town,
                            Url = dealer.Url
                        }
                    });
                    _dbContext.SubmitChanges();
                }

                if (!isCacheEnabled)
                    return viewModel;

                double time;
                var isParsed = double.TryParse(Common.Config.CacheExpiration, out time);
                if (!isParsed)
                    Cache.SaveToCache("MC-DEALERLOOKUP-" + postcodeInfo, viewModel, DateTimeOffset.Now.AddSeconds(time));
                return viewModel;
            }
        }
    }
}