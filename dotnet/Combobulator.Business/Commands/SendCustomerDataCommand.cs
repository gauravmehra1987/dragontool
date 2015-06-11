using System;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading;
using Combobulator.Business.Interfaces;
using Combobulator.Business.Services.Providers;
using Combobulator.Common;
using Combobulator.Common.Enums;
using Combobulator.Common.Exceptions;
using Combobulator.Common.Extensions;
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
        private readonly string _htmlTemplatePath;
        private readonly string _textTemplatePath;

        /// <summary>
        /// Initializes a new instance of the <see cref="SendCustomerDataCommand"/> class.
        /// </summary>
        /// <param name="customer">The customer object.</param>
        /// <param name="carModel">The car model identifier.</param>
        public SendCustomerDataCommand(Customer customer, string carModel, string htmlTemplatePath, string textTemplatePath)
        {
            _customer = customer;
            _carModel = carModel;
            _htmlTemplatePath = htmlTemplatePath;
            _textTemplatePath = textTemplatePath;
        }

        /// <summary>
        /// Sends form data to eMaster and GRG APIs and despatches emails.
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

            var dbCar = _dbContext.GetCar(_carModel).FirstOrDefault();
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
                EngineName = dbCar.EngineName,
                Model = dbCar.Model,
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
                Mpg = Convert.ToDouble(dbCar.Mpg),
                Url = dbCar.Url,
                Joke = dbCar.Joke
            };
            _customer.Car = car;
            var requestUrl = string.Empty;

            // Send to eMaster API
            var emResponse = false;
            if (_customer.UserId != "0")
            {
                IProvider eMasterProvider = new EMasterProvider();
                var emfunc = new FuncHelper.ExternalApiFunction<Customer, string, bool>(eMasterProvider.SendData);
                emResponse = FuncHelper.DoFuncWithRetry(emfunc, _customer, out requestUrl, TimeSpan.FromSeconds(2));
            }

            // Send to GRG API
            IProvider grassRootsProvider = new GrassRootsProvider();
            var grgfunc = new FuncHelper.ExternalApiFunction<Customer, string, bool>(grassRootsProvider.SendData);
            var grgResponse = FuncHelper.DoFuncWithRetry(grgfunc, _customer, out requestUrl, TimeSpan.FromSeconds(2));

            Log.Info("Response: " + grgResponse);

            if (!grgResponse)
            {
                var errorEmailSubject = Config.ErrorEmailSubject;
                var errorEmailDestination = Config.ErrorEmailDestination;
                var errorEmailText = requestUrl;
                MandrillHelper.SendEmail(errorEmailDestination, errorEmailSubject, null, "An error occured while processing the following URL:\r\n\r\n" + errorEmailText);
            }

            string readHTMLFile;
            string readTextFile;
            var subject = Config.EmailMeResultsSubject;
            using (var reader = new StreamReader(_htmlTemplatePath))
            {
                readHTMLFile = reader.ReadToEnd();
            }
            using (var reader = new StreamReader(_textTemplatePath))
            {
                readTextFile = reader.ReadToEnd();
            }
            var htmlBody = readHTMLFile;
            var textBody = readTextFile;
            var assetPath = Config.EmailAssetsDomain + Config.EmailAssetsLocation;
            var carAssetPath = Config.EmailAssetsDomain + Config.EmailCarAssetsLocation;
            var carPath = carAssetPath + "/" + _customer.Car.Code + ".jpg";

            var colour =
                Enum.GetValues(typeof (Colour))
                    .Cast<Colour>()
                    .FirstOrDefault(v => v.GetDescription() == _customer.Car.Color);
            var hexColour = colour.DisplayName();

            htmlBody = htmlBody.Replace("[[Title]]", _customer.Title)
                .Replace("[[Firstname]]", _customer.FirstName)
                .Replace("[[Lastname]]", _customer.LastName)
                .Replace("[[CarName]]", (Config.Brand + " " + car.EngineName + " " + car.Model).ToUpper())
                .Replace("[[Location]]", assetPath)
                .Replace("[[CarImage]]", carPath)
                .Replace("[[Colour]]", hexColour);
				
            textBody = textBody.Replace("[[Title]]", _customer.Title)
                .Replace("[[Firstname]]", _customer.FirstName)
                .Replace("[[Lastname]]", _customer.LastName)
                .Replace("[[CarName]]", (Config.Brand + " " + car.EngineName + " " + car.Model).ToUpper())
                .Replace("[[Location]]", assetPath)
                .Replace("[[CarImage]]", carPath)
                .Replace("[[Colour]]", hexColour);

            MandrillHelper.SendEmail(_customer.Email, subject, htmlBody, textBody);

            isComplete = true;

            return isComplete;
        }
    }
}
