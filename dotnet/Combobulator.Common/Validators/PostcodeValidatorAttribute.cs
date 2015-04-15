using System;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace Combobulator.Helpers
{
    public class PostcodeValidatorAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            return value != null && Regex.IsMatch(value.ToString(), Common.Config.PostcodeExpression);
        }
    }
}