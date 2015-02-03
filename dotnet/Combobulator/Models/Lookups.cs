using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Combobulator.Models
{
    public class Lookups
    {
        public Title Title { get; set; }
        public Dealer Dealer { get; set; }
    }
}