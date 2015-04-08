namespace Combobulator.Models
{
    public class NewCar
    {
        public string Code { get; set; }
        public string Color { get; set; }
        public string Engine { get; set; }
        public string Name { get; set; }
        public string Capacity { get; set; }
        public string Luggage { get; set; }
        public string Lifestyle { get; set; }
        public int Awd { get; set; }
        public int High { get; set; }
        public int Convertible { get; set; }
        public int Price { get; set; }
        public int Cost { get; set; }
        public int Speed { get; set; }
        public int Mph { get; set; }
        public int Economy { get; set; }
        public double Mpg { get; set; }
	    // ReSharper disable InconsistentNaming
        public string Alt_1 { get; set; }
        public string Alt_2 { get; set; }
        public string Alt_3 { get; set; }
	    // ReSharper restore InconsistentNaming
        public string Terms { get; set; }

        public string Info { get; set; }
        public int? Term { get; set; }
        public double? Payment { get; set; }
        public double? FinancePrice { get; set; }
        public double? Deposit { get; set; }
        public double? Contribution { get; set; }
        public double? PurchaseFee { get; set; }
        public double? FinalPayment { get; set; }
        public double? CreditCharge { get; set; }
        public string ROI { get; set; }
        public string APR { get; set; }
    }
}