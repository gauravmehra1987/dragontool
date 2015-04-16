﻿using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace Combobulator.Common.Validators
{
    public class NameValidatorAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            return value != null && Regex.IsMatch(value.ToString(), Config.NameExpression);
        }
    }
}
