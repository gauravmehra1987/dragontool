﻿using Combobulator.Models;
using CsvHelper.Configuration;

namespace Combobulator.Config
{
    public class NewCarConfig : CsvClassMap<NewCar>
    {
        public override void CreateMap()
        {
            Map(m => m.Code).Name("code");
            Map(m => m.Color).Name("color");
            Map(m => m.Engine).Name("engine");
            Map(m => m.Name).Name("name");
            Map(m => m.Capacity).Name("capacity");
            Map(m => m.Luggage).Name("luggage");
            Map(m => m.Lifestyle).Name("lifestyle");
            Map(m => m.Awd).Name("awd");
            Map(m => m.High).Name("high");
            Map(m => m.Convertible).Name("convertible");
            Map(m => m.Price).Name("price");
            Map(m => m.Cost).Name("cost");
            Map(m => m.Speed).Name("speed");
            Map(m => m.Mph).Name("mph");
            Map(m => m.Economy).Name("economy");
            Map(m => m.Mpg).Name("mpg");
            Map(m => m.Alt_1).Name("alt_1");
            Map(m => m.Alt_2).Name("alt_2");
            Map(m => m.Alt_3).Name("alt_3");
            Map(m => m.Terms).Name("info");
            Map(m => m.Term).Name("term");
            Map(m => m.Payment).Name("payment");
            Map(m => m.FinancePrice).Name("finance_price");
            Map(m => m.Deposit).Name("deposit");
            Map(m => m.Contribution).Name("contribution");
            Map(m => m.PurchaseFee).Name("purchase_fee");
            Map(m => m.FinalPayment).Name("final_payment");
            Map(m => m.CreditCharge).Name("credit_charge");
            Map(m => m.ROI).Name("roi");
            Map(m => m.APR).Name("apr");
        }
    }
}