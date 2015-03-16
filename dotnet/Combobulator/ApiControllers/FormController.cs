using Combobulator.Classes;
using Combobulator.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Combobulator.Business.ViewModels;
using Combobulator.Common.Extensions;

namespace Combobulator.ApiControllers
{
    public class FormController : Combobulator.ApiControllers.BaseController
    {
        //private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        private Combobulator.DAL.CombobulatorDataContext dbContext = new Combobulator.DAL.CombobulatorDataContext();

        // POST api/form
        [HttpPost]
        public HttpResponseMessage Post([FromBody]FormViewModel form)
        {
            try
            {
                var customer = new Customer
                {
                    AddressLine1 = form.Fields.Address_1,
                    AddressLine2 = form.Fields.Address_2,
                    AddressLine3 = form.Fields.Address_3,
                    AddressPostcode = form.Fields.Postcode,
                    Dealer = form.Fields.Dealer,
                    Email = form.Fields.Email,
                    FirstName = form.Fields.Name,
                    LastName = form.Fields.Surname,
                    Title = form.Fields.Title,
                    TelephoneMobile = form.Fields.Mobile,
                    TelephoneHome = form.Fields.Home,
                    TelephoneWork = form.Fields.Work,
                    RequestCallback = (form.Fields.Callback != "1" ? true : false),
                    UserId = form.Fields.UserId,
                    Selections = new Selections
                    {
                        Capacity = form.Input.Seats.CountCharacterFrequency(0).ToString(),
                        Luggage = form.Input.Luggage,
                        PriceRange = form.Input.Price,
                        Performance = form.Input.Speed,
                        Use = form.Input.Lifestyle,
                        Options = new Combobulator.Models.Options
                        {
                            AWD = form.Input.Options.awd,
                            DT = form.Input.Options.dt,
                            HP = form.Input.Options.hp,
                            TP = form.Input.Options.tp
                        },
                        Economy = form.Input.Mpg
                    }

                };
                var dbCar = dbContext.GetNewCar(form.Car).FirstOrDefault();
                var dbFinance = dbContext.GetCarFinance(dbCar.Id).FirstOrDefault();

                Combobulator.Models.NewCar car = new Combobulator.Models.NewCar
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
                    Alt_3 = dbCar.Alt3, APR = dbFinance.APR,
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
                customer.Car = car;

                
                if (customer != null && !string.IsNullOrEmpty(customer.UserId))
                {
                    // Send to API
                    Func<Customer, bool> func = new Func<Customer, bool>(Utils.SendExistingCustomerDataApi);
                    bool sent = Utils.DoFuncWithRetry(func, customer, TimeSpan.FromSeconds(2));

                    // If send api fails then send to fallback email
                    if (!sent)
                    {
                        Email.EmailCustomerDetails(customer);
                    }
                }
                else
                {
                    // Email customer details
                    Email.EmailCustomerDetails(customer);
                }

                /*
                // Email results to customer
                if (customer.EmailResults == true)
                {
                    try
                    {
                        Email.EmailMeResults(customer, car);
                    }
                    catch (Exception ex)
                    {
                        log.Error("EmailMeResults", ex);
                    }
                }
                */
                return Request.CreateResponse(HttpStatusCode.OK, "success");
            }
            catch (Exception ex)
            {
                log.Error("api/form", ex);
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
        }
    }
}
