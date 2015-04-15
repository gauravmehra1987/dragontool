using System;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Net.Sockets;

namespace Combobulator.Common.Validators
{
    public class ValidateEmailAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            try
            {
                var address = value.ToString();
                var host = (address.Split('@'));
                var hostname = host[1];

                var IPhst = Dns.Resolve(hostname);
                var endPt = new IPEndPoint(IPhst.AddressList[0], 25);
                var s = new Socket(endPt.AddressFamily, SocketType.Stream, ProtocolType.Tcp);
                s.Connect(endPt);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}