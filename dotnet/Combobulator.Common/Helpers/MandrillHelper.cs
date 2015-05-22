using System.Net.Mail;

namespace Combobulator.Common.Helpers
{
    public static class MandrillHelper
    {
        public static void SendEmail(string to, string subject, string htmlBody, string textBody)
        {
            var mail = new MailMessage();
            mail.To.Add(to);
            mail.From = new MailAddress(Config.FromAddress, Config.FromName);
            mail.Subject = subject;
            mail.AddView(htmlBody, "text/html");
            mail.AddView(textBody, "text/plain");

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

        public static MailMessage AddView(this MailMessage message, string body, string type)
        {
            var htmlView = AlternateView.CreateAlternateViewFromString(body, null, type);
            message.AlternateViews.Add(htmlView);
            return message;
        }
    }
}
