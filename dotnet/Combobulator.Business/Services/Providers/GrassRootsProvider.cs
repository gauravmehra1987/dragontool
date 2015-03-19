using System;
using Combobulator.Business.Interfaces;
using Combobulator.Business.ViewModels;
using Combobulator.Common;
using Combobulator.Common.Extensions;
using Combobulator.Common.Helpers;
using Combobulator.Models;
using Newtonsoft.Json;

namespace Combobulator.Business.Services.Providers
{
    public class GrassRootsProvider : IProvider
    {
        public bool SendData(Customer customer)
        {
            var success = false;
            var viewModel = new ResultViewModel
            {
                id = customer.UserId ?? "",
                title = customer.Title ?? "",
                first_name = customer.FirstName ?? "",
                surname = customer.LastName ?? "",
                email = customer.Email ?? "",
                telephone = customer.TelephoneHome ?? "",
                request_callback = customer.RequestCallback ? "true" : "false",
                request_early_redemption = customer.RequestEarlyRedemption ? "true" : "false",

                model_name = customer.Car.Name ?? "",
                model_code = customer.Car.Code ?? "",
                capacity = customer.Selections.Capacity == null ? "" : SelectionsDescriptionHelper.SelectionName(customer.Selections.Capacity, "CapacityScale"),
                luggage = customer.Selections.Luggage ?? "",

                awd = Convert.ToBoolean(customer.Selections.Options.AWD) ? "Yes" : "No",
                dt = Convert.ToBoolean(customer.Selections.Options.DT) ? "Yes" : "No",
                hp = Convert.ToBoolean(customer.Selections.Options.HP) ? "Yes" : "No",
                tp = Convert.ToBoolean(customer.Selections.Options.TP) ? "Yes" : "No",

                price_range = customer.Selections.PriceRange ?? "",
                performance = customer.Selections.Performance == null ? "" : SelectionsDescriptionHelper.SelectionName(customer.Selections.Performance, "PerformanceScale"),
                economy = customer.Selections.Economy ?? "",
                use = customer.Selections.Use == null ? "" : SelectionsDescriptionHelper.SelectionName(customer.Selections.Use, "Use")
            };

            var url = new Uri(Config.GrassRootsHostUrl)
                .AddParameter("addresstype", "Work")
                .AddParameter("dealer", "15106")
                .AddParameter("address1", customer.AddressLine1)
                .AddParameter("address2", customer.AddressLine2)
                .AddParameter("town", customer.AddressLine4)
                .AddParameter("hometelephone", customer.TelephoneHome)
                .AddParameter("worktelephone", customer.TelephoneWork)
                .AddParameter("mobiletelephone", customer.TelephoneMobile)
                .AddParameter("postcode", customer.AddressPostcode)
                .AddParameter("title", customer.Title)
                .AddParameter("firstname", customer.FirstName)
                .AddParameter("surname", customer.LastName)
                .AddParameter("email", customer.Email)
                .AddParameter("model", customer.Car.Code)
                .AddParameter("comments", "## CAR DATA ##")
                .AddParameter("telephonemarketing", "0")
                .AddParameter("postmarketing", "0")
                .AddParameter("application", "iprospect")
                .AddParameter("brand", "MINI")
                .AddParameter("form", "miniecom_tda")
                .AddParameter("campaign", "I1683");

            var response = HttpWebRequestHelper.MakeRequest(url.ToString());
            var data = HttpWebRequestHelper.GetHttpWebResponseData(response);

            dynamic obj = JsonConvert.SerializeObject(data);
            if (obj.Success != null)
            {
                success = true;
            }

            return success;
        }
    }
}
