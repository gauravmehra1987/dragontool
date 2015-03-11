namespace Combobulator.Models
{
	public class FinanceDetails
	{
		public int Term { get; set; }
        /*
		public decimal MonthlyPayments { get; set; }
		public decimal OnTheRoad { get; set; }
		public decimal CustomerDeposit { get; set; }
		public decimal RetailerDeposit { get; set; }
		public decimal OptionToPurchase { get; set; }
		public decimal OptionalFinalPayment { get; set; }
		public decimal TotalPayable { get; set; }
		public decimal TotalCredit { get; set; }
		public decimal InterestRate { get; set; }
		public decimal RepresentativeApr { get; set; }
        */
        public decimal Payment { get; set; }
        public decimal FinancePrice { get; set; }
        public decimal Deposit { get; set; }
        public decimal Contribution { get; set; }
        public decimal PurchaseFee { get; set; }
        public decimal FinalPayment { get; set; }
        public decimal CreditCharge { get; set; }
        public string ROI { get; set; }
        public string APR { get; set; }
	}
}