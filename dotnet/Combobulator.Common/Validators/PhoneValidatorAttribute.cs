using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace Combobulator.Common.Validators
{
    public class PhoneValidatorAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            return value == null || Regex.IsMatch(value.ToString(), Config.PhoneExpression);
        }
    }
}
