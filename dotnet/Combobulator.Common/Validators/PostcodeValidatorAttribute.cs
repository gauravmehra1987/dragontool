using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace Combobulator.Common.Validators
{
    public class PostcodeValidatorAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            return value != null && Regex.IsMatch(value.ToString().ToUpper(), Config.PostcodeExpression);
        }
    }
}