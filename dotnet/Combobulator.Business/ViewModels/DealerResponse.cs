using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Combobulator.Business.ViewModels
{
    public class DealerResponse
    {
        public status status { get; set; }
        public data data { get; set; }
    }

    public class status
    {
        public string key { get; set; }
        public string type { get; set; }
        public string detail { get; set; }
        public string subsystem { get; set; }
        public string messages { get; set; }
        public string logKey { get; set; }
    }

    public class data
    {
        public pois[] pois { get; set; }
    }

    public class pois
    {
        public string key { get; set; }
        public string name { get; set; }
        public string countryCode { get; set; }
        public string country { get; set; }
        public string state { get; set; }
        public string city { get; set; }
        public string postalCode { get; set; }
        public string street { get; set; }
        public string additionalStreet { get; set; }
        public double lat { get; set; }
        public double lng { get; set; }
        public double dist { get; set; }
        public string oh { get; set; }
        public attributes attributes { get; set; }
    }

    public class attributes
    {
        public string type { get; set; }
        public string distributionPartnerId { get; set; }
        public string distributionCode { get; set; }
        public string outletId { get; set; }
        public string homepage { get; set; }
        public string phone { get; set; }
        public string fax { get; set; }
        public string mail { get; set; }
    }
}
