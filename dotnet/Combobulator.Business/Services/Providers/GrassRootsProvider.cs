using System;
using System.Reflection;
using System.Web;
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

        public bool SendData(Customer customer)
        {
            var isComplete = false;
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

                    capacity =
                        customer.Selections.Capacity == null
                            ? ""
                            : SelectionsDescriptionHelper.SelectionName(customer.Selections.Capacity, "CapacityScale"),
                    performance =
                        customer.Selections.Performance == null
                            ? ""
                            : SelectionsDescriptionHelper.SelectionName(customer.Selections.Performance,
                                "PerformanceScale"),
                    use =
                        customer.Selections.Use == null
                            ? ""
                            : SelectionsDescriptionHelper.SelectionName(customer.Selections.Use, "Use")
                };

                var json = JsonConvert.SerializeObject(result);

                /*
                var url =
                    string.Format(
                        Config.GrassRootsHostUrl +
                        "&checksum={0}&system_id={1}&action={2}&de_id={3}&random={4}&outcome={5}&type=json", checksum,
                        Config.SystemId, action, customer.UserId, Config.Random, json);
                */

                var phone = customer.IsPhone ? "I" : "O";
                var post = customer.IsPost ? "I" : "O";

                var url = new Uri(Config.GrassRootsHostUrl)
                    .AddParameter("application", Config.GrassRootsAppName)
                    .AddParameter("form", "fqr")
                    .AddParameter("brand", "MINI")
                    .AddParameter("title", customer.Title)
                    .AddParameter("firstname", customer.FirstName)
                    .AddParameter("surname", customer.LastName)
                    .AddParameter("email", customer.Email)
                    .AddParameter("addresstype", "Home")
                    .AddParameter("address1", customer.AddressLine1)
                    .AddParameter("address2", customer.AddressLine2)
                    .AddParameter("address3", customer.AddressLine3)
                    .AddParameter("town", customer.AddressLine3)
                    .AddParameter("postcode", customer.AddressPostcode)
                    .AddParameter("hometelephone", customer.TelephoneHome.Replace(" ",""))
                    .AddParameter("worktelephone", customer.TelephoneWork)
                    .AddParameter("mobiletelephone", customer.TelephoneMobile)
                    .AddParameter("mobiletelephone", customer.TelephoneMobile)
                    .AddParameter("emailmarketing", "I")
                    .AddParameter("postmarketing", post)
                    .AddParameter("telephonemarketing", phone)
                    .AddParameter("dealer", "15106")
                    .AddParameter("model", customer.Car.Code)
                    .AddParameter("finance", "Y");

                var requestUrl =
                    string.Format(
                        url.ToString() +
                        "&comments=##{0}##", json);

                var response = HttpWebRequestHelper.MakeRequest(requestUrl);
                var data = HttpWebRequestHelper.GetHttpWebResponseData(response);

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
                Log.Error("GrassRoots Provider - " + ex.Message);
                return isComplete;
            }
        }
    }
}
