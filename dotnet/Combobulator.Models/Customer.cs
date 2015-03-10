using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace Combobulator.Models
{
    public class Customer
    {
        public NewCar Car { get; set; }
        public Selections Selections { get; set; }

        public List<Title> Titles { get; set; }
        public List<Dealer> Dealers { get; set; }

        [HiddenInput(DisplayValue = false)]
        public string UserId { get; set; }

        [Required(ErrorMessage = "Title is required")]
        [StringLength(20)]
        [Display(Name = "Title")]
        public string Title { get; set; }

        [Required(ErrorMessage = "First names is required")]
        [StringLength(20)]
        [Display(Name = "First names")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last name is required")]
        [StringLength(20)]
        [Display(Name = "Last name")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Email address is required")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address")]
        [StringLength(50)]
        [Display(Name = "Email address")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Home telephone is required")]
        [StringLength(20)]
        [Display(Name = "Home telephone")]
        public string TelephoneHome { get; set; }

        [Required(ErrorMessage = "Work telephone is required")]
        [StringLength(20)]
        [Display(Name = "Work telephone")]
        public string TelephoneWork { get; set; }

        [Required(ErrorMessage = "Mobile telephone is required")]
        [StringLength(20)]
        [Display(Name = "Mobile telephone")]
        public string TelephoneMobile { get; set; }

        [Required(ErrorMessage = "Address line 1 is required")]
        [StringLength(20)]
        [Display(Name = "Address line 1")]
        public string AddressLine1 { get; set; }

        [Required(ErrorMessage = "Address line 2 is required")]
        [StringLength(20)]
        [Display(Name = "Address line 2")]
        public string AddressLine2 { get; set; }

        [Display(Name = "Address line 3")]
        public string AddressLine3 { get; set; }

        [Display(Name = "Address line 4")]
        public string AddressLine4 { get; set; }

        [Required(ErrorMessage = "Postcode is required")]
        [StringLength(10)]
        [Display(Name = "Postcode")]
        public string AddressPostcode { get; set; }

        [Display(Name = "Dealer")]
        public string Dealer { get; set; }

        [Display(Name = "Request callback")]
        public bool RequestCallback { get; set; }

        [Display(Name = "Request early redemption")]
        public bool RequestEarlyRedemption { get; set; }

        [Display(Name = "Email me my results")]
        public bool EmailResults { get; set; }
    }
}
