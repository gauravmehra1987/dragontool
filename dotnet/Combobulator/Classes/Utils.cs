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

namespace Combobulator.Classes
{
    public static class Utils
    {
        public static Customer GetCustomerById(string id)
        {
            string checksum = GetChecksum(id); // "e5f941771d";
            string systemId = "3491056";
            string action = "getcustomerdetails";
            string customerId = id;
            string random = "01234564rf";
            string url = string.Format("http://combobdev.emaster.me.uk/?script=EM/External&checksum={0}&system_id={1}&action={2}&de_id={3}&random={4}&type=json", checksum, systemId, action, customerId, random);

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

        public static void SendExistingCustomerData(Customer customer)
        {
            string url = "";
            UTF8Encoding encoding = new UTF8Encoding();
            Byte[] byteArray = encoding.GetBytes(new JavaScriptSerializer().Serialize(customer));

            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.Method = "POST";
            request.ContentLength = byteArray.Length;
            request.ContentType = @"application/json";

            using (Stream dataStream = request.GetRequestStream())
            {
                dataStream.Write(byteArray, 0, byteArray.Length);
            }

            long length = 0;

            try
            {
                using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
                {
                    length = response.ContentLength;
                }
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

        private static string GetChecksum(string userId)
        {
            string url = string.Format("http://combobdev.emaster.me.uk/?script=EM/External&system_id=3491056&action=getMD5&random=01234564rf&de_id={0}", userId);

            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.Method = "GET";
            request.ContentType = @"application/json";
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            StreamReader responseStream = new StreamReader(response.GetResponseStream());

            string line = responseStream.ReadLine();

            return line;
        }

        public static void SendNewCustomerData(Customer customer)
        {

        }

        public static void RequestCallback(Customer customer)
        {

        }

        public static void RequestEarlyRedemption(Customer customer)
        {

        }
    }
}