using System.Net.Mail;

namespace Combobulator.Common.Helpers
{
    public static class MandrillHelper
    {
        public static void SendEmail(string to, string subject, string body)
        {
            var mail = new MailMessage();
            mail.To.Add(to);
            mail.From = new MailAddress(Config.FromAddress, Config.FromName);
            mail.Subject = subject;
            mail.Body = body;
            mail.IsBodyHtml = true;

            using (var smtp = new SmtpClient())
            {
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.Host = Config.Host;
                smtp.Port = Config.Port;
                smtp.EnableSsl = true;
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = new System.Net.NetworkCredential(Config.Username, Config.Password);
                smtp.Send(mail);
            }
        }
    }
}
