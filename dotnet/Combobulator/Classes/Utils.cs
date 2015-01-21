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

        private string _systemId = "3491056";
        private string _random = "01234564rf";
        private string _secretKey = "NTRlODdhZTJkMzc3ZDgxMzVkOWNiYzQ1";

        public Customer GetCustomerById(string customerId)
        {
            string action = "getcustomerdetails";
            string checksum = GetCustomerDetailsChecksum(_systemId, customerId, _secretKey, _random);
            string url = string.Format("http://combobdev.emaster.me.uk/?script=EM/External&checksum={0}&system_id={1}&action={2}&de_id={3}&random={4}&type=json", checksum, _systemId, action, customerId, _random);

            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.Method = "GET";
            request.ContentType = @"application/json";
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            StreamReader responseStream = new StreamReader(response.GetResponseStream());

            string line = responseStream.ReadLine();
            dynamic obj = JsonUtils.JsonObject.GetDynamicJsonObject(line);
            if (obj.Error != null)
            {
                return new Customer();
            }
            else
            {
                Customer customer = new Customer();
                customer.FirstName = obj.first_name;
                customer.LastName = obj.surname;
                customer.Email = obj.email;
                return customer;
            }
        }

        public void SendExistingCustomerData(Customer customer)
        {
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
            string url = string.Format("http://combobdev.emaster.me.uk/?script=EM/External&checksum={0}&system_id={1}&action={2}&de_id={3}&random={4}&outcome={5}&type=json", checksum, _systemId, action, customerId, _random, json);

            try
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.Method = "POST";
                request.ContentType = @"application/json";
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                StreamReader responseStream = new StreamReader(response.GetResponseStream());

                string line = responseStream.ReadLine();
                dynamic obj = JsonUtils.JsonObject.GetDynamicJsonObject(line);
            }
            catch (WebException ex)
            {
                WebResponse errorResponse = ex.Response;
                using (Stream responseStream = errorResponse.GetResponseStream())
                {
                    StreamReader reader = new StreamReader(responseStream, Encoding.GetEncoding("utf-8"));
                    String errorText = reader.ReadToEnd();
                    // log errorText
                }
                throw;
            }
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
    }
}