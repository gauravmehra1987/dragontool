using System.ComponentModel.DataAnnotations;
using Combobulator.Helpers;

namespace Combobulator.Business.ViewModels
{
    public class TestViewModel
    {
        public FormStuff info { get; set; }
        public string car { get; set; }
        public InputStuff input { get; set; }
        public OptionStuff options { get; set; }
    }

    public class FormStuff
    {
        public string userid { get; set; }
        [Required]
        public string title { get; set; }
        [Required]
        public string name { get; set; }
        [Required]
        public string surname { get; set; }
        [Required]
        public string address1 { get; set; }
        public string address2 { get; set; }
        public string address3 { get; set; }

        public bool address_type_home { get; set; }
        public bool address_type_work { get; set; }
        [Required]
        [PostcodeValidator]
        public string postcode { get; set; }
        [Required]
        //[ValidateEmail]
        public string email { get; set; }
        [Required]
        public string dealer { get; set; }

        [Required]
        public string telhome { get; set; }
        [Required]
        public string telwork { get; set; }
        [Required]
        public string telmobile { get; set; }

        public bool finance { get; set; }

        public bool optoutphone { get; set; }
        public bool optoutpost { get; set; }
    }

    public class InputStuff
    {
        public string seats { get; set; }
        public string speed { get; set; }
        public int mpg { get; set; }
        public string lifestyle { get; set; }
        public string luggage { get; set; }
        public int price { get; set; }
        public OptionStuff options { get; set; }
    }

    public class OptionStuff
    {
        public bool awd { get; set; }
        public bool tp { get; set; }
        public bool hp { get; set; }
        public bool dt { get; set; }
    }
}
