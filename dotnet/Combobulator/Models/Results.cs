using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Globalization;
using System.Web.Mvc;
using System.Web.Security;

namespace Combobulator.Models
{
    public class Results
    {
        public Car Car { get; set; }
        public Customer CustomerForm { get; set; }
    }
}
