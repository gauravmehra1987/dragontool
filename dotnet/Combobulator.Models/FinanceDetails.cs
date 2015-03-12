namespace Combobulator.Models
{
	public class FinanceDetails
	{
		public int Term { get; set; }
        public double Payment { get; set; }
        public double FinancePrice { get; set; }
        public double Deposit { get; set; }
        public double Contribution { get; set; }
        public double PurchaseFee { get; set; }
        public double FinalPayment { get; set; }
        public double CreditCharge { get; set; }
        public string ROI { get; set; }
        public string APR { get; set; }
	}
}