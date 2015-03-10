﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Combobulator.Models
{
    public class PostcodeLookUp
    {
        public int Id { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string Town { get; set; }
        public string County { get; set; }
        public string Postcode { get; set; }
    }
}