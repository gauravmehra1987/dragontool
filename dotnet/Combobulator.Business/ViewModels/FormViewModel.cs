using System.Collections.Generic;
using Combobulator.Models;

namespace Combobulator.Business.ViewModels
{
    public class FormViewModel
    {
        public int UserId { get; set; }
        public string Code { get; set; }
        public string Title { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string TelephoneHome { get; set; }
        public bool AddressType { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string AddressLine3 { get; set; }
        public string AddressPostcode { get; set; }
        public string Dealer { get; set; }
        public bool RequestCallback { get; set; }
        public bool EmailResults { get; set; }

        public string Postcode { get; set; }
        public List<Title> Titles { get; set; }
        public List<Dealer> Dealers { get; set; }
    }
}
