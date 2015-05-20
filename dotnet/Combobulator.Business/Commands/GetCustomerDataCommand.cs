using System;
using System.Reflection;
using Combobulator.Common;
using Combobulator.Common.Helpers;
using Combobulator.Models;
using log4net;
using Newtonsoft.Json;

namespace Combobulator.Business.Commands
{
    public class GetCustomerDataCommand
    {
        //Set Logging
        protected static readonly ILog Log = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
        private readonly int _customerId;

        /// <summary>
        /// Initializes a new instance of the <see cref="GetCustomerDataCommand"/> class.
        /// </summary>
        /// <param name="customerId">The customer identifier.</param>
        public GetCustomerDataCommand(int customerId)
        {
            _customerId = customerId;
        }

        /// <summary>
        /// Retrieves customer details from eMaster API and returns a customer object.
        /// </summary>
        /// <returns>A customer object.</returns>
        public Customer Execute()
        {
            try
            {
                const string action = "getcustomerdetails";
                var input = Config.SystemId + _customerId + Config.SecretKey + Config.Random;
                var checksum = CryptoHelper.CalculateMd5Hash(input);

                var url = string.Format(Config.HostUrl + "&checksum={0}&system_id={1}&action={2}&de_id={3}&random={4}&type=json", checksum, Config.SystemId, action, _customerId, Config.Random);
                var response = HttpWebRequestHelper.MakeRequest(url,5000);
                var line = HttpWebRequestHelper.GetHttpWebResponseData(response);

                dynamic obj = JsonConvert.DeserializeObject(line);
                //dynamic obj = JsonUtils.JsonObject.GetDynamicJsonObject(line);
                if (obj.Error != null)
                {
                    Log.Error("GetCustomerDataCommand Error - " + obj.Error);
                    return new Customer();
                }

                var customer = new Customer
                {
                    UserId = _customerId.ToString(),
                    FirstName = obj.first_name,
                    LastName = obj.surname,
                    Email = obj.email
                };
                return customer;
            }
            catch (Exception ex)
            {
                Log.Error("GetCustomerDataCommand", ex);
                return new Customer();
            }
        }
    }
}
