﻿using System;
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
                var result = new GRGViewModel
                {
                    model_name = customer.Car.Name ?? "",
                    model_code = customer.Car.Code ?? "",
                    luggage = customer.Selections.Luggage ?? "",

                    awd = Convert.ToBoolean(customer.Selections.Options.AWD) ? "Yes" : "No",
                    dt = Convert.ToBoolean(customer.Selections.Options.DT) ? "Yes" : "No",
                    hp = Convert.ToBoolean(customer.Selections.Options.HP) ? "Yes" : "No",
                    tp = Convert.ToBoolean(customer.Selections.Options.TP) ? "Yes" : "No",

                    price_range = customer.Selections.PriceRange ?? "",
                    economy = customer.Selections.Economy ?? "",

                    capacity = customer.Selections.Capacity,
                    performance = customer.Selections.Performance,
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

                var town = customer.AddressLine3 ?? customer.AddressLine2;

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
                    .AddParameter("town", town)
                    .AddParameter("postcode", customer.AddressPostcode)
                    .AddParameter("hometelephone", customer.TelephoneHome.Replace(" ", ""))
                    .AddParameter("worktelephone", customer.TelephoneWork)
                    .AddParameter("mobiletelephone", customer.TelephoneMobile)
                    .AddParameter("mobiletelephone", customer.TelephoneMobile)
                    .AddParameter("emailmarketing", "I")
                    .AddParameter("postmarketing", customer.IsPost ? "I" : "O")
                    .AddParameter("telephonemarketing", customer.IsPhone ? "I" : "O")
                    .AddParameter("dealer", customer.Dealer)
                    .AddParameter("model", customer.Car.Code);

                requestUrl = string.Format(url + "&comments=##{0}##", json);

                Log.Info("Request URL:" + requestUrl);

                var data = String.Empty;
                try
                {
                    var response = HttpWebRequestHelper.MakeRequest(requestUrl, 5000);
                    data = HttpWebRequestHelper.GetHttpWebResponseData(response);
                    Log.Info("JSON Response: " + data);
                }
                catch (Exception ex)
                {
                    Log.Error("No data received.");
                    Log.Error(ex.Message);
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
