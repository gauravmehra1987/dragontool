using Combobulator.Models;
using CsvHelper.Configuration;

namespace Combobulator.Config
{
    public class NewCarConfigRedux : CsvClassMap<NewCar>
    {
        public override void CreateMap()
        {
            Map(m => m.Code).Name("Code");
            Map(m => m.Color).Name("Color");
            Map(m => m.Engine).Name("Engine");
            Map(m => m.Name).Name("Name");
            Map(m => m.Capacity).Name("Capacity");
            Map(m => m.Luggage).Name("Luggage");
            Map(m => m.Lifestyle).Name("Lifestyle");
            Map(m => m.Awd).Name("Awd");
            Map(m => m.High).Name("High");
            Map(m => m.Convertible).Name("Convertible");
            Map(m => m.Price).Name("Price");
            Map(m => m.Cost).Name("Cost");
            Map(m => m.Speed).Name("Speed");
            Map(m => m.Mph).Name("Mph");
            Map(m => m.Economy).Name("Economy");
            Map(m => m.Mpg).Name("Mpg");
            Map(m => m.Alt_1).Name("Alt_1");
            Map(m => m.Alt_2).Name("Alt_2");
            Map(m => m.Alt_3).Name("Alt_3");
            Map(m => m.Terms).Name("Terms");
            Map(m => m.Info).Name("Info");
            Map(m => m.Term).Name("Term");
            Map(m => m.Payment).Name("Payment");
            Map(m => m.FinancePrice).Name("Finance_Price");
            Map(m => m.Deposit).Name("Deposit");
            Map(m => m.Contribution).Name("Contribution");
            Map(m => m.PurchaseFee).Name("Purchase_Fee");
            Map(m => m.FinalPayment).Name("Final_Payment");
            Map(m => m.CreditCharge).Name("Credit_Charge");
            Map(m => m.ROI).Name("ROI");
            Map(m => m.APR).Name("APR");
            Map(m => m.TotalAmount).Name("Total_amount_payable");
        }
    }
}