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
        private string _subject = WebConfigurationManager.AppSettings["EmailSubject"];
        private int _port = Convert.ToInt32(WebConfigurationManager.AppSettings["EmailPort"]);
        private string _fromAddress = WebConfigurationManager.AppSettings["EmailFromAddress"];
        private string _fromName = WebConfigurationManager.AppSettings["EmailFromName"];
        private string _template = WebConfigurationManager.AppSettings["EmailTemplate"];
        private string _assetUrl = WebConfigurationManager.AppSettings["EmailAssetUrl"];

        public void SendEmailResults(Customer customer)
        {
            MailMessage mail = new MailMessage();
            mail.To.Add(customer.Email);
            mail.From = new MailAddress(_fromAddress, _fromName);
            mail.Subject = _subject;
            mail.Body = CreateEmailBody(customer);
            mail.IsBodyHtml = true;

            using (SmtpClient smtp = new SmtpClient())
            {
                try
                {
                    smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                    smtp.Host = _host;
                    smtp.Port = _port;
                    smtp.EnableSsl = true;
                    smtp.UseDefaultCredentials = false;
                    smtp.Credentials = new System.Net.NetworkCredential(_username, _password);
                    smtp.Send(mail);
                }
                catch (Exception ex)
                {
                    string err = ex.Message;
                }
            }
        }

        private string CreateEmailBody(Customer customer)
        {
            string readFile = string.Empty;
            string strBody = string.Empty;
            using (StreamReader reader = new StreamReader(HttpContext.Current.Server.MapPath(_template)))
            {
                readFile = reader.ReadToEnd();
            }
            strBody = readFile;
            strBody = strBody.Replace("[[]]", "");
            return strBody;
        }
    }
}