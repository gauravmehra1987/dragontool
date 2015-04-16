using System;
using System.ComponentModel.DataAnnotations;
using System.Net;

namespace Combobulator.Common.Validators
{
    public class EmailValidatorAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            try
            {
                var host = value.ToString().Split('@');
                var hostname = host[1];

                var entry = Dns.GetHostEntry(hostname);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}