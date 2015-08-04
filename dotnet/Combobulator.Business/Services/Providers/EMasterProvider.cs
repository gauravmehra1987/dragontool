using System;
using System.ComponentModel;
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
    public class EMasterProvider : IProvider
    {
        public static readonly ILog Log = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);

        public bool SendData(Customer customer, out string requestUrl)
        {
            var isComplete = false;
            requestUrl = string.Empty;
            
            const string action = "recordoutcome";
            var input = Config.SystemId + customer.UserId + Config.SecretKey + Config.Random;
            var checksum = CryptoHelper.CalculateMd5Hash(input);

            try
            {
                //var isFinance = customer.IsFinance;
                var isEmail = customer.IsEmail;
                var isPhone = customer.IsPhone;
                var isPost = customer.IsPost;

                var capacity = customer.Selections.Capacity.Split(',');

                var viewModel = new ResultViewModel
                {
                    id = customer.UserId ?? "",
                    title = customer.Title ?? "",
                    first_name = customer.FirstName ?? "",
                    surname = customer.LastName ?? "",
                    email = customer.Email ?? "",
                    telephone = customer.TelephoneHome ?? "",

                    request_callback = "false",
                    request_early_redemption = "false",

                    email_communication = isEmail ? "true" : "false",
                    phone_communication = isPhone ? "true" : "false",
                    post_communication = isPost ? "true" : "false",

                    model_name = customer.Car.Name ?? "",
                    model_code = customer.Car.Code ?? "",
                    
                    price_range = customer.Selections.PriceRange ?? "",
                    economy = customer.Selections.Economy ?? "",
                    luggage = customer.Selections.Luggage ?? "",
                    
                    awd = customer.Selections.Options.AWD,
                    dt = customer.Selections.Options.DT,
                    hp = customer.Selections.Options.HP,
                    tp = customer.Selections.Options.TP,
                    
                    performance = customer.Selections.Performance,
                    capacity = capacity.CountCharacterFrequency(0),
                    use = customer.Selections.Use
                };

                var json = JsonConvert.SerializeObject(viewModel);
                requestUrl =
                    string.Format(
                        Config.HostUrl +
                        "&checksum={0}&system_id={1}&action={2}&de_id={3}&random={4}&outcome={5}&type=json", checksum,
                        Config.SystemId, action, customer.UserId, Config.Random, json);

                Log.Info("Request URL:" + requestUrl);

                var response = HttpWebRequestHelper.MakeRequest(requestUrl, 5000);
                var data = HttpWebRequestHelper.GetHttpWebResponseData(response);

                dynamic obj = JsonConvert.DeserializeObject(data);
                if (obj["Error"] != null)
                {
                    var error = obj["Error"];
                    var responseCode = (Common.Enums.eMasterResponseCode) error;
                    var type = typeof (Common.Enums.eMasterResponseCode);
                    var member = type.GetMember(responseCode.ToString());
                    var attributes = member[0].GetCustomAttributes(typeof (DescriptionAttribute), false);
                    var description = ((DescriptionAttribute) attributes[0]).Description;

                    Log.Error("eMaster recordoutcome method - " + description);
                }
                else
                {
                    Log.Info(obj.ToString());
                    isComplete = true;
                }
                return isComplete;
            }
            catch (Exception ex)
            {
                Log.Error("EMaster Provider - " + ex.Message);
                return isComplete;
            }
        }
    }
}
