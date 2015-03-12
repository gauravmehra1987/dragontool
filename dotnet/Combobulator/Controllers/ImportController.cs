﻿using System;
using System.Data.Linq;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CsvHelper;
using System.IO;
using Combobulator.Config;
using Combobulator.Models;
using Combobulator.DAL;

namespace Combobulator.Controllers
{
    public class ImportController : BaseController
    {
        private DAL.CombobulatorDataContext dbContext = new DAL.CombobulatorDataContext();

        //private TextReader fileReader;

        public ActionResult Index()
        {
            var fileName = Server.MapPath("~/App_Data/mini_data_latest.csv");
            using (var fileReader = System.IO.File.OpenText(fileName))
            using (var csv = new CsvReader(fileReader))
            {
                var cultureInfo = CultureInfo.CurrentCulture;
                csv.Configuration.IgnoreReadingExceptions = true;
                csv.Configuration.ReadingExceptionCallback = ReadingExceptionCallback;
                csv.Configuration.WillThrowOnMissingField = false;
                csv.Configuration.IsHeaderCaseSensitive = false;
                csv.Configuration.HasHeaderRecord = true;
                csv.Configuration.TrimFields = true;
                csv.Configuration.IgnoreHeaderWhiteSpace = true;
                csv.Configuration.CultureInfo = cultureInfo;
                csv.Configuration.RegisterClassMap<NewCarConfig>();

                var records = csv.GetRecords<Combobulator.Models.NewCar>().Distinct().ToList();
                using (var context = new DAL.CombobulatorDataContext())
                {
                    foreach (var record in records)
                    {
                        var finance = new EntitySet<Finance>();
                        finance.Add(new Finance
                            {
                                Term = record.Term,
                                FinalPayment = record.FinalPayment,
                                FinancePrice = record.FinancePrice,
                                APR = record.APR,
                                ROI = record.ROI,
                                Contribution = record.Contribution,
                                CreditCharge = record.CreditCharge,
                                Deposit = record.Deposit,
                                Payment = record.Payment,
                                PurchaseFee = record.PurchaseFee
                            });

                        context.NewCars.InsertOnSubmit(new DAL.NewCar
                        {
                            Code = record.Code,
                            Color = record.Color,
                            Engine = record.Engine,
                            Name = record.Name,
                            Capacity = record.Capacity,
                            Luggage = record.Luggage,
                            Lifestyle = record.Lifestyle,
                            Awd = record.Awd,
                            High = record.High,
                            Convertible = record.Convertible,
                            Price = record.Price,
                            Cost = record.Cost,
                            Speed = record.Speed,
                            Mph = record.Mph,
                            Economy = record.Economy,
                            Mpg = record.Mph,
                            Alt1 = record.Alt_1,
                            Alt2 = record.Alt_2,
                            Alt3 = record.Alt_3,
                            Terms = record.Terms,
                            Finances = finance
                        });
                        context.SubmitChanges();
                    }
                }
            }
            return View();
        }

        private static void ReadingExceptionCallback(Exception ex, ICsvReader reader)
        {
            throw ex;
        }
    }
}