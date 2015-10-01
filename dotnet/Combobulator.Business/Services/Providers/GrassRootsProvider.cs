using System;
using System.Net;
using System.Reflection;
using Combobulator.Business.Interfaces;
using Combobulator.Business.ViewModels;
using Combobulator.Common;
using Combobulator.Common.Extensions;
using Combobulator.Common.Helpers;
using Combobulator.Models;
using log4net;
using Newtonsoft.Json;

namespace Combobulator.Business.Services.Providers
{
    public class GrassRootsProvider : IProvider
    {
        public static readonly ILog Log = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);

        public bool SendData(Customer customer, out string requestUrl)
        {
            var isComplete = false;
            requestUrl = string.Empty;
            try
            {
                var capacity = customer.Selections.Capacity.Split(',');

                var result = new GRGViewModel
                {
                    model = customer.Car.Code ?? "",
                    luggage = customer.Selections.Luggage ?? "",

                    awd = Convert.ToBoolean(customer.Selections.Options.AWD) ? "Yes" : "No",
                    dt = Convert.ToBoolean(customer.Selections.Options.DT) ? "Yes" : "No",
                    hp = Convert.ToBoolean(customer.Selections.Options.HP) ? "Yes" : "No",
                    cn = Convert.ToBoolean(customer.Selections.Options.TP) ? "Yes" : "No",

                    price = customer.Selections.PriceRange ?? "",
                    mpg = customer.Selections.Economy ?? "",

                    capacity = capacity.CountCharacterFrequency(0),
                    speed = customer.Selections.Performance,
                    use = customer.Selections.Use
                };

                var json = JsonConvert.SerializeObject(result);

                Log.Info("JSON: " + json);

                /*
                var url =
                    string.Format(
                        Config.GrassRootsHostUrl +
                        "&checksum={0}&system_id={1}&action={2}&de_id={3}&random={4}&outcome={5}&type=json", checksum,
                        Config.SystemId, action, customer.UserId, Config.Random, json);
                */

                Log.Info("Base Url: " + Config.GrassRootsHostUrl);

                var url = new Uri(Config.GrassRootsHostUrl)
                    .AddParameter("application", Config.GrassRootsAppName)
                    .AddParameter("form", Config.GrassRootsPDICode)
                    .AddParameter("brand", Config.Brand)
                    .AddParameter("title", customer.Title)
                    .AddParameter("firstname", customer.FirstName)
                    .AddParameter("surname", customer.LastName)
                    .AddParameter("email", customer.Email)
                    .AddParameter("addresstype", customer.AddressType)
                    .AddParameter("address1", customer.AddressLine1)
                    .AddParameter("address2", customer.AddressLine2)
                    .AddParameter("address3", customer.AddressLine3)
                    .AddParameter("town", customer.Town)
                    .AddParameter("postcode", customer.AddressPostcode)
                    .AddParameter("hometelephone", customer.TelephoneHome.Replace(" ", ""))
                    .AddParameter("worktelephone", customer.TelephoneWork)
                    .AddParameter("mobiletelephone", customer.TelephoneMobile)
                    .AddParameter("mobiletelephone", customer.TelephoneMobile)
                    .AddParameter("emailmarketing", customer.IsEmail ? "O" : "I")
                    .AddParameter("postmarketing", customer.IsPost ? "O" : "I")
                    .AddParameter("telephonemarketing", customer.IsPhone ? "O" : "I")
                    .AddParameter("dealer", customer.Dealer)
                    .AddParameter("model", customer.Car.Code);

                // Comments request to be removed (2015-09-01, by Alison Bater, via Email)
                // Removal actioned by @willperring
                //requestUrl = string.Format(url + "&comments={0}", json);
                requestUrl = url.ToString();

                Log.Info("Request URL: " + url);

                var data = String.Empty;
                try
                {
                    //var httpWebRequest = (HttpWebRequest)WebRequest.Create(requestUrl);
                    //httpWebRequest.ContentType = "text/xml";
                    //httpWebRequest.Method = "GET";
                    //httpWebRequest.KeepAlive = false;
                    //httpWebRequest.Timeout = 50000;

                    try
                    {
                        // Seemingly redundant, removed by @willperring 2015-09-01
                        //var testResponse = (HttpWebResponse) httpWebRequest.GetResponse();

                        var response = HttpWebRequestHelper.MakeRequest(requestUrl, 5000);
                        Log.Info("Response Null?: " + (response == null));
                        Log.Info("Response Content: " + response);
                        Log.Info("Response Code: " + response.StatusCode);
                        Log.Info("Response: " + response.StatusDescription);
                        data = HttpWebRequestHelper.GetHttpWebResponseData(response);
                        Log.Info("JSON Response: " + data);
                    }
                    catch (WebException ex)
                    {
                        Log.Error("WebException: " + ex.Message + "\n" + ex.StackTrace);
                    }
                    catch (Exception ex)
                    {
                        Log.Error("Exception: " + ex.Message + "\n" + ex.StackTrace);
                    }
                }
                catch (Exception ex)
                {
                    Log.Error("No data received.");
                    Log.Error(ex.Message);
                    Log.Info(ex.StackTrace);
                }
                if (string.IsNullOrEmpty(data))
                    return isComplete;

                dynamic obj = JsonConvert.DeserializeObject(data);
                if (obj["responsecode"] != "0")
                {
                    var error = obj["errormessage"];
                    Log.Error("GrassRoots - " + error);
                }
                else
                {
                    isComplete = true;
                }
                return isComplete;
            }
            catch (Exception ex)
            {
                Log.Error("GrassRoots Provider - " + ex.StackTrace);
                return isComplete;
            }
        }
    }
}
