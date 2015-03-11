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
        
        public int Term { get; set; }
        public int Payment { get; set; }
        public int FinancePrice { get; set; }
        public int Deposit { get; set; }
        public int Contribution { get; set; }
        public int PurchaseFee { get; set; }
        public int FinalPayment { get; set; }
        public int CreditCharge { get; set; }
        public string ROI { get; set; }
        public string APR { get; set; }
    }
}