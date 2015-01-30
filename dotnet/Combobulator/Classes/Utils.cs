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

namespace Combobulator.Classes
{
    public class Utils
    {
        #region Private/Protected Members
        private static readonly Utils _instance = new Utils();
        #endregion

        #region Public Properties
        public static Utils Instance
        {
            get
            {
                return _instance;
            }
        }
        #endregion

        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        private string _systemId = WebConfigurationManager.AppSettings["FiscSystemId"];
        private string _random = WebConfigurationManager.AppSettings["FiscRandom"];
        private string _secretKey = WebConfigurationManager.AppSettings["FiscSecretKey"];
        private string _hostUrl = WebConfigurationManager.AppSettings["FiscURL"];

        public Customer GetCustomerById(string customerId)
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

        public bool SendExistingCustomerDataApi(Customer customer)
        {
            bool success = false;
            string action = "recordoutcome";
            string customerId = customer.UserId;
            string checksum = GetCustomerDetailsChecksum(_systemId, customerId, _secretKey, _random);
            string json = new JavaScriptSerializer().Serialize(new
            {
                id = customer.UserId,
                title = customer.Title,
                first_name = customer.FirstName,
                surname = customer.LastName,
                email = customer.Email,
                telephone = customer.TelephoneHome,
                request_callback = "true",
                request_early_redemption = "true"
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
                eMasterResponseCode responseCode = (eMasterResponseCode)(Convert.ToInt32(obj.Error));
                var type = typeof(eMasterResponseCode);
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

        public void SendNewCustomerData(Customer customer)
        {

        }

        private string GetCustomerDetailsChecksum(string systemId, string userId, string secretKey, string random)
        {
            string input = systemId + userId + secretKey + random;
            return CalculateMD5Hash(input);
        }

        private string CalculateMD5Hash(string input)
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

        public bool DoFuncWithRetry(Func<Customer, bool> func, Customer customer, TimeSpan sleepPeriod, int retryCount = 3)
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

        private enum eMasterResponseCode
        {
            [Description("System ID is invalid")]
            SystemIdInvalid = 101,
            [Description("Checksum is invalid – Either not 10 characters or incorrect")]
            ChecksumInvalid = 102,
            [Description("Customer reference is unknown")]
            CustomerReferenceUnknown = 103,
            [Description("Random value is invalid – Either not 10 characters or alphanumeric")]
            RandomValueInvalid = 104,
            [Description("System ID parameter not supplied")]
            SystemIdNotSupplied = 201,
            [Description("Checksum parameter not supplied")]
            ChecksumNotSupplied = 202,
            [Description("Random parameter not supplied")]
            RandomNotSupplied = 203,
            [Description("Customer reference parameter not supplied")]
            CustomerReferenceNotSupplied = 204,
            [Description("Outcome parameter not supplied")]
            OutcomeNotSupplied = 205,
            [Description("Received parameter not supplied")]
            ReceivedParameterNotSupplied = 206,
            [Description("Outcome successfully saved")]
            OutSuccessfullySaved = 301,
            [Description("Missing outcome parameters")]
            MissingOutcomeParameter = 302,
            [Description("Invalid parameter values")]
            ParameterValuesInvalid = 303,
            [Description("Unable to save outcome data")]
            UnableToSaveOutcomeData = 304,
            [Description("Unable to decode outcome")]
            UnableToDecodeOutcome = 305,
            [Description("Invalid action")]
            InvalidAction = 401,
            [Description("Action parameter not supplied")]
            ActionParameterNotSupplied = 402
        }
    }
}