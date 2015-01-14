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

namespace Combobulator.Classes
{
    public static class Utils
    {
        public static Customer GetCustomerById(string id)
        {
            Customer customer = new Customer();
            customer.UserId = id;
            customer.Title = "Sir";
            customer.FirstName = "Customer";
            customer.LastName = "Customer";
            customer.Email = "keith.vong@iris-worldwide.com";
            customer.TelephoneHome = "01234567890";
            return customer;
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

        public static void SendNewCustomerData(Customer customer)
        {

        }
    }
}