namespace Combobulator.Models
{
    public class DealerLookUp
    {
        public int? DealerId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Country { get; set; }
        public string County { get; set; }
        public string Town { get; set; }
        public string Postcode { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public string Url { get; set; }
        public string Phone { get; set; }
        public string Fax { get; set; }
        public double? Distance { get; set; }
        public string Email { get; set; }
    }
}
