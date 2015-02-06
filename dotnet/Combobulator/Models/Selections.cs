using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Combobulator.Models
{
    public class Selections
    {
        public string Capacity { get; set; }
        public string Luggage { get; set; }
        public string Options { get; set; }
        public string PriceRange { get; set; }
        public string Performance { get; set; }
        public string Economy { get; set; }
        public string Use { get; set; }
    }
}