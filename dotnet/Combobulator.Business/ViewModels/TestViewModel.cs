using System.ComponentModel.DataAnnotations;
using Combobulator.Common.Validators;

namespace Combobulator.Business.ViewModels
{
    public class TestViewModel
    {
        public FormStuff info { get; set; }
        public string car { get; set; }
        public InputStuff input { get; set; }
    }

    public class FormStuff
    {
        public string userid { get; set; }
        [Required]
        public string title { get; set; }
        [Required]
        [NameValidator]
        public string name { get; set; }
        [Required]
        [NameValidator]
        public string surname { get; set; }
        [Required]
        public string address_1 { get; set; }
        public string address_2 { get; set; }
        public string address_3 { get; set; }

        public bool address_type_home { get; set; }
        public bool address_type_work { get; set; }

        [Required]
        public string postcode_search { get; set; }
        [Required]
        [PostcodeValidator]
        [Compare("postcode_search", ErrorMessage = "Postcode does not match.")]
        public string postcode { get; set; }
        [Required]
        [EmailValidator]
        public string email { get; set; }
        [Required]
        public string dealer { get; set; }

        [Required]
        [PhoneValidator]
        public string tel_home { get; set; }
        [PhoneValidator]
        public string tel_work { get; set; }
        [PhoneValidator]
        public string tel_mobile { get; set; }

        public bool finance { get; set; }

        public string optout_phone { get; set; }
        public string optout_post { get; set; }
    }

    public class InputStuff
    {
        public string[] seats { get; set; }
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
