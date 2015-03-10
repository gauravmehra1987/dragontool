using Combobulator.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using Newtonsoft.Json;
using System.Security.Cryptography;
using System.Web.Configuration;
using System.ComponentModel;
using System.Threading;
using Combobulator.Classes;

namespace Combobulator.Classes
{
    public class Utils
    {
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        private static string _systemId = WebConfigurationManager.AppSettings["FiscSystemId"];
        private static string _random = WebConfigurationManager.AppSettings["FiscRandom"];
        private static string _secretKey = WebConfigurationManager.AppSettings["FiscSecretKey"];
        private static string _hostUrl = WebConfigurationManager.AppSettings["FiscURL"];

        public static Customer GetCustomerById(string customerId)
        {
            try
            {
                string action = "getcustomerdetails";
                string checksum = GetCustomerDetailsChecksum(_systemId, customerId, _secretKey, _random);
                string url = string.Format(_hostUrl + "&checksum={0}&system_id={1}&action={2}&de_id={3}&random={4}&type=json", checksum, _systemId, action, customerId, _random);

                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.Method = "GET";
                request.ContentType = @"application/json";
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                StreamReader responseStream = new StreamReader(response.GetResponseStream());

                string line = responseStream.ReadLine();
                dynamic obj = JsonUtils.JsonObject.GetDynamicJsonObject(line);
                if (obj.Error != null)
                {
                    log.Error("GetCustomerById Error - " + obj.Error);
                    return new Customer();
                }
                else
                {
                    Customer customer = new Customer();
                    customer.UserId = customerId;
                    customer.FirstName = obj.first_name;
                    customer.LastName = obj.surname;
                    customer.Email = obj.email;
                    return customer;
                }
            }
            catch (Exception ex)
            {
                log.Error("GetCustomerById", ex);
                return new Customer();
            }
        }

        public static List<Customer> GetCustomers()
        {
            try
            {
                string action = "getnewrecords";
                string checksum = GetCustomerChecksum(_systemId, _secretKey, _random);
                string url = string.Format(_hostUrl + "&checksum={0}&system_id={1}&action={2}&random={3}&type=json", checksum, _systemId, action, _random);

                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.Method = "GET";
                request.ContentType = @"application/json";
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                StreamReader responseStream = new StreamReader(response.GetResponseStream());

                string line = responseStream.ReadLine();
                dynamic obj = JsonUtils.JsonObject.GetDynamicJsonObject(line);
                if (obj.Error != null)
                {
                    log.Error("GetCustomers Error - " + obj.Error);
                    return null;
                }
                return null;
            }
            catch (Exception ex)
            {
                log.Error("GetCustomerById", ex);
                return null;
            }
        }

        public static bool SendExistingCustomerDataApi(Customer customer)
        {
            bool success = false;
            string action = "recordoutcome";
            string customerId = customer.UserId;
            string checksum = GetCustomerDetailsChecksum(_systemId, customerId, _secretKey, _random);
            string json = new JavaScriptSerializer().Serialize(new
            {
                id = customer.UserId == null ? "" : customer.UserId,
                title = customer.Title == null ? "" : customer.Title,
                first_name = customer.FirstName == null ? "" : customer.FirstName,
                surname = customer.LastName == null ? "" : customer.LastName,
                email = customer.Email == null ? "" : customer.Email,
                telephone = customer.TelephoneHome == null ? "" : customer.TelephoneHome,
                request_callback = customer.RequestCallback == true ? "true" : "false",
                request_early_redemption = customer.RequestEarlyRedemption == true ? "true" : "false",
                model_name = customer.Car.Name == null ? "" : customer.Car.Name,
                model_code = customer.Car.Code == null ? "" : customer.Car.Code,
                capacity = customer.Selections.Capacity == null ? "" : Utils.SelectionsDescription(customer.Selections.Capacity, "CapacityScale"),
                luggage = customer.Selections.Luggage == null ? "" : Utils.SelectionsDescription(customer.Selections.Luggage, "LuggageLevel"),
                options = customer.Selections.Options == null ? "" : Utils.SelectionsDescription(customer.Selections.Options, "Options"),
                price_range = customer.Selections.PriceRange == null ? "" : Utils.SelectionsDescription(customer.Selections.PriceRange, "PriceRange"),
                performance = customer.Selections.Performance == null ? "" : Utils.SelectionsDescription(customer.Selections.Performance, "PerformanceScale"),
                economy = customer.Selections.Economy == null ? "" : Utils.SelectionsDescription(customer.Selections.Economy, "EconomyScale"),
                use = customer.Selections.Use == null ? "" : Utils.SelectionsDescription(customer.Selections.Use, "Use")
            });

            string url = string.Format(_hostUrl + "&checksum={0}&system_id={1}&action={2}&de_id={3}&random={4}&outcome={5}&type=json", checksum, _systemId, action, customerId, _random, json);

            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.Method = "GET";
            request.ContentType = @"application/json";
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            StreamReader responseStream = new StreamReader(response.GetResponseStream());

            string line = responseStream.ReadLine();
            dynamic obj = JsonUtils.JsonObject.GetDynamicJsonObject(line);
            if (obj.Error != null)
            {
                Common.Enums.eMasterResponseCode responseCode = (Common.Enums.eMasterResponseCode)(Convert.ToInt32(obj.Error));
                var type = typeof(Common.Enums.eMasterResponseCode);
                var member = type.GetMember(responseCode.ToString());
                var attributes = member[0].GetCustomAttributes(typeof(DescriptionAttribute), false);
                var description = ((DescriptionAttribute)attributes[0]).Description;

                throw new Exception("eMaster recordoutcome method - " + description);
            }
            else if (obj.Success != null)
            {
                success = true;
            }

            return success;
        }

        private static string GetCustomerDetailsChecksum(string systemId, string userId, string secretKey, string random)
        {
            string input = systemId + userId + secretKey + random;
            return CalculateMD5Hash(input);
        }

        private static string GetCustomerChecksum(string systemId, string secretKey, string random)
        {
            string input = systemId + secretKey + random;
            return CalculateMD5Hash(input);
        }

        private static string CalculateMD5Hash(string input)
        {
            MD5 md5 = System.Security.Cryptography.MD5.Create();
            byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(input);
            byte[] hash = md5.ComputeHash(inputBytes);

            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < hash.Length; i++)
            {
                sb.Append(hash[i].ToString("x2"));
            }

            string s = sb.ToString();

            if (s.Length > 10)
            {
                return s.Substring(s.Length - 10, 10);
            }
            else
            {
                return sb.ToString();
            }
        }

        public static bool DoFuncWithRetry(Func<Customer, bool> func, Customer customer, TimeSpan sleepPeriod, int retryCount = 3)
        {
            bool success = false;
            while (true)
            {
                try
                {
                    success = func(customer);
                    break; // success
                }
                catch
                {
                    if (--retryCount == 0)
                    {
                        break;
                    }
                    else
                    { 
                        Thread.Sleep(sleepPeriod); 
                    }
                }
            }
            return success;
        }

        public static string SelectionsDescription(string id, string stype)
        {
            string description = string.Empty;
            switch (stype)
            {
                case "CapacityScale":
                    Common.Enums.CapacityScale selection1 = (Common.Enums.CapacityScale)(Convert.ToInt32(id));
                    var type1 = typeof(Common.Enums.CapacityScale);
                    var member1 = type1.GetMember(selection1.ToString());
                    var attributes1 = member1[0].GetCustomAttributes(typeof(DescriptionAttribute), false);
                    description = ((DescriptionAttribute)attributes1[0]).Description;
                    break;
                case "EconomyScale":
                    Common.Enums.EconomyScale selection2 = (Common.Enums.EconomyScale)(Convert.ToInt32(id));
                    var type2 = typeof(Common.Enums.EconomyScale);
                    var member2 = type2.GetMember(selection2.ToString());
                    var attributes2 = member2[0].GetCustomAttributes(typeof(DescriptionAttribute), false);
                    description = ((DescriptionAttribute)attributes2[0]).Description;
                    break;
                case "LuggageLevel":
                    Common.Enums.LuggageLevel selection3 = (Common.Enums.LuggageLevel)(Convert.ToInt32(id));
                    var type3 = typeof(Common.Enums.LuggageLevel);
                    var member3 = type3.GetMember(selection3.ToString());
                    var attributes3 = member3[0].GetCustomAttributes(typeof(DescriptionAttribute), false);
                    description = ((DescriptionAttribute)attributes3[0]).Description;
                    break;
                case "Options":
                    Common.Enums.Options selection4 = (Common.Enums.Options)(Convert.ToInt32(id));
                    var type4 = typeof(Common.Enums.Options);
                    var member4 = type4.GetMember(selection4.ToString());
                    var attributes4 = member4[0].GetCustomAttributes(typeof(DescriptionAttribute), false);
                    description = ((DescriptionAttribute)attributes4[0]).Description;
                    break;
                case "PerformanceScale":
                    Common.Enums.PerformanceScale selection5 = (Common.Enums.PerformanceScale)(Convert.ToInt32(id));
                    var type5 = typeof(Common.Enums.PerformanceScale);
                    var member5 = type5.GetMember(selection5.ToString());
                    var attributes5 = member5[0].GetCustomAttributes(typeof(DescriptionAttribute), false);
                    description = ((DescriptionAttribute)attributes5[0]).Description;
                    break;
                case "PriceRange":
                    Common.Enums.PriceRange selection6 = (Common.Enums.PriceRange)(Convert.ToInt32(id));
                    var type6 = typeof(Common.Enums.PriceRange);
                    var member6 = type6.GetMember(selection6.ToString());
                    var attributes6 = member6[0].GetCustomAttributes(typeof(DescriptionAttribute), false);
                    description = ((DescriptionAttribute)attributes6[0]).Description;
                    break;
                case "Use":
                    Common.Enums.Use selection7 = (Common.Enums.Use)(Convert.ToInt32(id));
                    var type7 = typeof(Common.Enums.Use);
                    var member7 = type7.GetMember(selection7.ToString());
                    var attributes7 = member7[0].GetCustomAttributes(typeof(DescriptionAttribute), false);
                    description = ((DescriptionAttribute)attributes7[0]).Description;
                    break;
            }

            return description;
        }
    }
}