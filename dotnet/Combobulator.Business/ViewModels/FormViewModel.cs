using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Combobulator.Business.ViewModels
{

    /*
    {"fields":
        {"UserId":"999","title":"Mr","name":"Bill","surname":"Gates","email":"bill@apple.com","home":"020112233",
    "work":"080112233","mobile":"077112233","address-1":"13 Corner Street","address-2":"Chicago","address-3":"Illinois",
    "postcode":"SW1 1AA","dealer":"dealer_name","callback":"1","results":"1"},
    "car":"XS72",
    "input":{
        "seats":["Man","0","0","0","0"],
        "lifestyle":"2",
        "speed":"1",
        "mpg":"25",
        "luggage":"minimalist",
        "options":{"awd":"false","hp":"false","dt":"false","tp":"false"},
        "price":"190"
    }
}
*/

    public class FormViewModel
    {
        public Fields Fields { get; set; }
        public string Car { get; set; }
        public Input Input { get; set; }
    }

    public class Fields
    {
        public string UserId { get; set; }
        public string Title { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Home { get; set; }
        public string Work { get; set; }
        public string Mobile { get; set; }
        public string Address_1 { get; set; }
        public string Address_2 { get; set; }
        public string Address_3 { get; set; }
        public string Postcode { get; set; }
        public string Dealer { get; set; }
        public string Callback { get; set; }
    }

    public class Input
    {
        public string[] Seats { get; set; }
        public string Lifestyle { get; set; }
        public string Speed { get; set; }
        public string Mpg { get; set; }
        public string Luggage { get; set; }
        public Options Options { get; set; }
        public string Price { get; set; }
    }

    public class Options
    {
        public string awd {get;set;}
        public string hp {get;set;}
        public string dt {get;set;}
        public string tp { get; set; }
    }
}
