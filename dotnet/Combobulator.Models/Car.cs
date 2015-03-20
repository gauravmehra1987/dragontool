namespace Combobulator.Models
{
    public class Car
    {
        public int Id { get; set; }
        public string Model { get; set; }
        public string ModelCode { get; set; }
        public string Colour { get; set; }
        public string Engine { get; set; }
        public string DisplayName { get; set; }
        public string Type { get; set; }
        public string CapacityScale { get; set; }
        public string LuggageScale { get; set; }
        public string Options { get; set; }
        public string PriceScale { get; set; }
        public string Cost { get; set; }
        public string PerformanceScale { get; set; }
		// ReSharper disable once InconsistentNaming
		public string MPH { get; set; }
        public string EconomyScale { get; set; }
	    // ReSharper disable once InconsistentNaming
        public string MPG { get; set; }
        public string UsageScale { get; set; }
        public string Alt1 { get; set; }
        public string Alt2 { get; set; }
        public string Alt3 { get; set; }
        public string TermsConditions { get; set; }
		public Finance Finance { get; set; }
    }
}
