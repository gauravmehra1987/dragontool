using System;
using System.IO;
using System.Linq;
using System.Reflection;
using Combobulator.Business.Interfaces;
using Combobulator.Business.Services.Providers;
using Combobulator.Common;
using Combobulator.Common.Exceptions;
using Combobulator.Common.Helpers;
using Combobulator.Models;
using Combobulator.Data;
using log4net;

namespace Combobulator.Business.Commands
{
    public class SendCustomerDataCommand
    {
        private readonly CombobulatorDataContext _dbContext = new CombobulatorDataContext();
        private static readonly ILog Log = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
        private readonly Customer _customer;
        private readonly string _carModel;
        private readonly string _templatePath;

        /// <summary>
        /// Initializes a new instance of the <see cref="SendCustomerDataCommand"/> class.
        /// </summary>
        /// <param name="customer">The customer object.</param>
        /// <param name="carModel">The car model identifier.</param>
        public SendCustomerDataCommand(Customer customer, string carModel, string templatePath)
        {
            _customer = customer;
            _carModel = carModel;
            _templatePath = templatePath;
        }

        /// <summary>
        /// Sends form data to eMaster API and despatches emails.
        /// </summary>
        /// <returns>True/False</returns>
        /// <exception cref="CarNotFoundException">
        /// Car not found.
        /// or
        /// Finance option not found.
        /// </exception>
        public bool Execute()
        {
            var isComplete = false;

            var dbCar = _dbContext.GetNewCar(_carModel).FirstOrDefault();
            if (dbCar == null)
                throw new CarNotFoundException("Car not found.");

            var dbFinance = _dbContext.GetCarFinance(dbCar.Id).FirstOrDefault();
            if (dbFinance == null)
                throw new CarNotFoundException("Finance option not found.");

            var car = new Models.NewCar()
            {
                Code = dbCar.Code,
                Color = dbCar.Color,
                Engine = dbCar.Engine,
                Name = dbCar.Name,
                Capacity = dbCar.Capacity,
                Luggage = dbCar.Luggage,
                Lifestyle = dbCar.Lifestyle,
                Awd = dbCar.Awd,
                High = dbCar.High,
                Convertible = dbCar.Convertible,
                Price = dbCar.Price,
                Cost = dbCar.Cost,
                Speed = dbCar.Speed,
                Mph = dbCar.Mph,
                Economy = dbCar.Economy,
                Terms = dbCar.Terms,
                Alt_1 = dbCar.Alt1,
                Alt_2 = dbCar.Alt2,
                Alt_3 = dbCar.Alt3,
                APR = dbFinance.APR,
                Contribution = dbFinance.Contribution,
                CreditCharge = dbFinance.CreditCharge,
                Deposit = dbFinance.Deposit,
                FinalPayment = dbFinance.FinalPayment,
                PurchaseFee = dbFinance.PurchaseFee,
                ROI = dbFinance.ROI,
                Term = dbFinance.Term,
                FinancePrice = dbFinance.FinancePrice,
                Payment = dbFinance.Payment,
                Mpg = Convert.ToDouble(dbCar.Mpg)
            };
            _customer.Car = car;

            if (!string.IsNullOrEmpty(_customer.UserId))
            {
                // Send to eMaster API
                IProvider eMasterProvider = new EMasterProvider();
                Func<Customer, bool> emfunc = eMasterProvider.SendData;
                var emResponse = FuncHelper.DoFuncWithRetry(emfunc, _customer, TimeSpan.FromSeconds(2));

                IProvider grassRootsProvider = new GrassRootsProvider();
                Func<Customer, bool> grgfunc = grassRootsProvider.SendData;
                var grgResponse = FuncHelper.DoFuncWithRetry(grgfunc, _customer, TimeSpan.FromSeconds(2));

                if ((emResponse) && (grgResponse))
                {
                    isComplete = true;
                }
                else
                {
                    isComplete = true;
                }

                // If send api fails then send to fallback email
                if (!emResponse)
                {
                    var readFile = string.Empty;
                    var strBody = string.Empty;
                    var subject = Config._emailMeResultsSubject;
                    var template = Config._emailMeResultsTemplate;
                    using (var reader = new StreamReader(_templatePath))
                    {
                        readFile = reader.ReadToEnd();
                    }
                    strBody = readFile;
                    strBody = strBody.Replace("[[Title]]", _customer.Title)
                        .Replace("[[Firstname]]", _customer.FirstName)
                        .Replace("[[Lastname]]", _customer.LastName)
                        .Replace("[[CarName]]", car.Name);

                    MandrillHelper.SendEmail(_customer.Email, subject, strBody);
                }
            }
            else
            {
                // Email customer details
                //Email.EmailCustomerDetails(_customer);
            }

            /*
            // Email results to customer
            if (_customer.EmailResults)
            {
                try
                {
                    //Email.EmailMeResults(customer, car);
                }
                catch (Exception ex)
                {
                    Log.Error("EmailMeResults", ex);
                }
            }
            */
            return isComplete;
        }
    }
}
