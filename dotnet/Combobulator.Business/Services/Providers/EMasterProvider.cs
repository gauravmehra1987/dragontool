using System;
using System.ComponentModel;
using Combobulator.Business.Interfaces;
using Combobulator.Business.ViewModels;
using Combobulator.Common;
using Combobulator.Common.Helpers;
using Combobulator.Models;
using Newtonsoft.Json;

namespace Combobulator.Business.Services.Providers
{
    public class EMasterProvider : IProvider
    {
        public bool SendData(Customer customer)
        {
            var success = false;
            const string action = "recordoutcome";
            var input = Config.SystemId + customer.UserId + Config.SecretKey + Config.Random;
            var checksum = CryptoHelper.CalculateMd5Hash(input);
            var result = new ResultViewModel
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

            var json = JsonConvert.SerializeObject(result);
            var url = string.Format(Config.HostUrl + "&checksum={0}&system_id={1}&action={2}&de_id={3}&random={4}&outcome={5}&type=json", checksum, Config.SystemId, action, customer.UserId, Config.Random, json);

            var response = HttpWebRequestHelper.MakeRequest(url);
            var data = HttpWebRequestHelper.GetHttpWebResponseData(response);

            dynamic obj = JsonUtils.JsonObject.GetDynamicJsonObject(data);
            if (obj.Error != null)
            {
                var responseCode = (Common.Enums.eMasterResponseCode)(Convert.ToInt32(obj.Error));
                var type = typeof(Common.Enums.eMasterResponseCode);
                var member = type.GetMember(responseCode.ToString());
                var attributes = member[0].GetCustomAttributes(typeof(DescriptionAttribute), false);
                var description = ((DescriptionAttribute)attributes[0]).Description;

                throw new Exception("eMaster recordoutcome method - " + description);
            }

            if (obj.Success != null)
            {
                success = true;
            }

            return success;
        }
    }
}
