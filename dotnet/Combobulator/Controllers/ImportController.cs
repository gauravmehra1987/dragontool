using System;
using System.Data.Linq;
using System.Globalization;
using System.Linq;
using System.Web.Mvc;
using CsvHelper;
using Combobulator.Config;
using Combobulator.Data;

namespace Combobulator.Controllers
{
    public class ImportController : BaseController
    {
        /// <summary>
        /// Reads a local CSV file and imports the data into database.
        /// </summary>
        public void Index()
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

                var records = csv.GetRecords<Models.NewCar>().Distinct().ToList();
                using (var context = new CombobulatorDataContext())
                {
                    foreach (var record in records)
                    {
                        var finance = new EntitySet<Finance>
                        {
                            new Finance
                            {
                                Term = record.Term ?? 0,
                                FinalPayment = record.FinalPayment ?? 0.0,
                                FinancePrice = record.FinancePrice ?? 0.0,
                                APR = record.APR,
                                ROI = record.ROI,
                                Contribution = record.Contribution ?? 0.0,
                                CreditCharge = record.CreditCharge ?? 0.0,
                                Deposit = record.Deposit ?? 0.0,
                                Payment = record.Payment ?? 0.0,
                                PurchaseFee = record.PurchaseFee ?? 0.0
                            }
                        };

                        context.NewCars.InsertOnSubmit(new NewCar
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
        }

        /// <summary>
        /// Readings the exception callback.
        /// </summary>
        /// <param name="ex">The ex.</param>
        /// <param name="reader">The reader.</param>
        private static void ReadingExceptionCallback(Exception ex, ICsvReader reader)
        {
            throw ex;
        }
    }
}