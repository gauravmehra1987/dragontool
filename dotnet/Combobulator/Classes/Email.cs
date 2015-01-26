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
        #region Private/Protected Members
        private static readonly Email _instance = new Email();
        #endregion

        #region Public Properties
        public static Email Instance
        {
            get
            {
                return _instance;
            }
        }
        #endregion

        private string _host = WebConfigurationManager.AppSettings["EmailHost"];
        private string _username = WebConfigurationManager.AppSettings["EmailUsername"];
        private string _password = WebConfigurationManager.AppSettings["EmailPassword"];
        private int _port = Convert.ToInt32(WebConfigurationManager.AppSettings["EmailPort"]);
        private string _fromAddress = WebConfigurationManager.AppSettings["EmailFromAddress"];
        private string _fromName = WebConfigurationManager.AppSettings["EmailFromName"];
        private string _assetUrl = WebConfigurationManager.AppSettings["EmailAssetUrl"];
        private string _emailAddressTo = WebConfigurationManager.AppSettings["EmailAddressTo"];
        private string _emailCustomerDetailsSubject = WebConfigurationManager.AppSettings["EmailCustomerDetailsSubject"];
        private string _emailMeResultsSubject = WebConfigurationManager.AppSettings["EmailMeResultsSubject"];

        public void EmailMeResults(Customer customer)
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
            strBody = strBody.Replace("[[]]", "");

            SendEmail(customer.Email, subject, strBody);
        }

        public void EmailCustomerDetails(Customer customer)
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
            strBody = strBody.Replace("[[]]", "");

            SendEmail(_emailAddressTo, subject, strBody);
        }

        public void SendEmail(string to, string subject, string body)
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