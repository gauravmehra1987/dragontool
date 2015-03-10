using Combobulator.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Web;
using System.Web.Configuration;

namespace Combobulator.Classes
{
    public class Email
    {
        private static string _host = WebConfigurationManager.AppSettings["EmailHost"];
        private static string _username = WebConfigurationManager.AppSettings["EmailUsername"];
        private static string _password = WebConfigurationManager.AppSettings["EmailPassword"];
        private static int _port = Convert.ToInt32(WebConfigurationManager.AppSettings["EmailPort"]);
        private static string _fromAddress = WebConfigurationManager.AppSettings["EmailFromAddress"];
        private static string _fromName = WebConfigurationManager.AppSettings["EmailFromName"];
        private static string _assetUrl = WebConfigurationManager.AppSettings["EmailAssetUrl"];
        private static string _emailAddressTo = WebConfigurationManager.AppSettings["EmailAddressTo"];
        private static string _emailCustomerDetailsSubject = WebConfigurationManager.AppSettings["EmailCustomerDetailsSubject"];
        private static string _emailMeResultsSubject = WebConfigurationManager.AppSettings["EmailMeResultsSubject"];

        public static void EmailMeResults(Customer customer, NewCar car)
        {
            string readFile = string.Empty;
            string strBody = string.Empty;
            string subject = _emailMeResultsSubject;
            string template = WebConfigurationManager.AppSettings["EmailMeResultsTemplate"];
            using (StreamReader reader = new StreamReader(HttpContext.Current.Server.MapPath(template)))
            {
                readFile = reader.ReadToEnd();
            }
            strBody = readFile;
            strBody = strBody.Replace("[[Title]]", customer.Title)
                     .Replace("[[Firstname]]", customer.FirstName)
                     .Replace("[[Lastname]]", customer.LastName)
                     .Replace("[[ModelCode]]", car.Code)
                     .Replace("[[Model]]", car.Name)
                     .Replace("[[Cost]]", car.Cost.ToString())
                     .Replace("[[TermsConditions]]", car.Terms);

            SendEmail(customer.Email, subject, strBody);
        }

        public static void EmailCustomerDetails(Customer customer)
        {
            string readFile = string.Empty;
            string strBody = string.Empty;
            string subject = _emailCustomerDetailsSubject;
            string template = WebConfigurationManager.AppSettings["EmailCustomerDetailsTemplate"];
            using (StreamReader reader = new StreamReader(HttpContext.Current.Server.MapPath(template)))
            {
                readFile = reader.ReadToEnd();
            }
            strBody = readFile;
            strBody = strBody.Replace("[[Title]]", customer.Title)
                     .Replace("[[Firstname]]", customer.FirstName)
                     .Replace("[[Lastname]]", customer.LastName)
                     .Replace("[[Telephone]]", customer.TelephoneHome)
                     .Replace("[[Email]]", customer.Email)
                     .Replace("[[Requestcallback]]", customer.RequestCallback ? "true" : "false")
                     .Replace("[[RequestEarlyRedemption]]", customer.RequestEarlyRedemption ? "true" : "false");

            SendEmail(_emailAddressTo, subject, strBody);
        }

        public static void SendEmail(string to, string subject, string body)
        {
            MailMessage mail = new MailMessage();
            mail.To.Add(to);
            mail.From = new MailAddress(_fromAddress, _fromName);
            mail.Subject = subject;
            mail.Body = body;
            mail.IsBodyHtml = true;

            using (SmtpClient smtp = new SmtpClient())
            {
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.Host = _host;
                smtp.Port = _port;
                smtp.EnableSsl = true;
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = new System.Net.NetworkCredential(_username, _password);
                smtp.Send(mail);
            }
        }
    }
}