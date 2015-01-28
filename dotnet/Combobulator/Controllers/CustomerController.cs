using Combobulator.Classes;
using Combobulator.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace Combobulator.Controllers
{
    public class CustomerController : Controller
    {
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        private Combobulator.DAL.CombobulatorDataContext dbContext = new Combobulator.DAL.CombobulatorDataContext();

        [HttpPost]
        public ActionResult NewCustomerSubmit(FormCollection collection)
        {
            try
            {
                Customer customer = new Customer
                {
                    UserId = collection["UserId"],
                    FirstName = collection["FirstName"],
                    LastName = collection["LastName"],
                    Email = collection["Email"],
                    TelephoneHome = collection["TelephoneHome"],
                    TelephoneMobile = collection["TelephoneMobile"],
                    TelephoneWork = collection["TelephoneWork"],
                    AddressLine1 = collection["AddressLine1"],
                    AddressLine2 = collection["AddressLine2"],
                    AddressLine3 = collection["AddressLine3"],
                    AddressLine4 = collection["AddressLine4"],
                    AddressPostcode = collection["AddressPostcode"],
                    Dealer = collection["Dealer"],
                    RequestCallback = collection["RequestCallback"].Contains("true"),
                    EmailResults = collection["EmailResults"].Contains("true")
                };

                string modelCode = "XN12";
                Combobulator.DAL.Car dbCar = dbContext.GetCar(modelCode).FirstOrDefault();
                Car car = new Car
                {
                    Id = dbCar.Id,
                    Model = dbCar.Model,
                    ModelCode = dbCar.ModelCode,
                    Colour = dbCar.Colour,
                    Engine = dbCar.Engine,
                    DisplayName = dbCar.DisplayName,
                    Type = dbCar.Type,
                    CapacityScale = dbCar.CapacityScale,
                    LuggageScale = dbCar.LuggageScale,
                    Options = dbCar.Options,
                    PriceScale = dbCar.PriceScale,
                    Cost = dbCar.Cost,
                    PerformanceScale = dbCar.PerformanceScale,
                    MPH = dbCar.MPH,
                    EconomyScale = dbCar.EconomyScale,
                    MPG = dbCar.MPG,
                    UsageScale = dbCar.UsageScale,
                    Alt1 = dbCar.Alt1,
                    Alt2 = dbCar.Alt2,
                    Alt3 = dbCar.Alt3,
                    TermsConditions = dbCar.TermsConditions
                };

                if (ViewData.ModelState.IsValid)
                {
                    if (customer.EmailResults == true)
                    {
                        Email.Instance.EmailMeResults(customer, car);
                    }

                    Utils.Instance.SendNewCustomerData(customer);
                }
                return View("~/Views/Results/_FormConfirmation.cshtml");
            }
            catch (Exception ex)
            {
                log.Error("NewCustomerSubmit", ex);
                return View("~/Views/Results/_FormError.cshtml");
            }
        }

        [HttpPost]
        public ActionResult ExistingCustomerSubmit(FormCollection collection)
        {
            try
            {
                Customer customer = new Customer
                {
                    UserId = collection["UserId"],
                    Title = collection["Title"],
                    FirstName = collection["FirstName"],
                    LastName = collection["LastName"],
                    Email = collection["Email"],
                    TelephoneHome = collection["TelephoneHome"],
                    RequestCallback = collection["RequestCallback"].Contains("true"),
                    RequestEarlyRedemption = collection["RequestEarlyRedemption"].Contains("true"),
                    EmailResults = collection["EmailResults"].Contains("true")
                };

                string modelCode = collection["ModelCode"];
                Combobulator.DAL.Car dbCar = dbContext.GetCar(modelCode).FirstOrDefault();
                Car car = new Car
                {
                    Id = dbCar.Id,
                    Model = dbCar.Model,
                    ModelCode = dbCar.ModelCode,
                    Colour = dbCar.Colour,
                    Engine = dbCar.Engine,
                    DisplayName = dbCar.DisplayName,
                    Type = dbCar.Type,
                    CapacityScale = dbCar.CapacityScale,
                    LuggageScale = dbCar.LuggageScale,
                    Options = dbCar.Options,
                    PriceScale = dbCar.PriceScale,
                    Cost = dbCar.Cost,
                    PerformanceScale = dbCar.PerformanceScale,
                    MPH = dbCar.MPH,
                    EconomyScale = dbCar.EconomyScale,
                    MPG = dbCar.MPG,
                    UsageScale = dbCar.UsageScale,
                    Alt1 = dbCar.Alt1,
                    Alt2 = dbCar.Alt2,
                    Alt3 = dbCar.Alt3,
                    TermsConditions = dbCar.TermsConditions
                };

                if (ViewData.ModelState.IsValid)
                {
                    if (customer.EmailResults == true)
                    {
                        Email.Instance.EmailMeResults(customer, car);
                    }

                    if (!string.IsNullOrEmpty(customer.UserId))
                    {
                        // Send to API
                        Func<Customer, bool> func = new Func<Customer, bool>(Utils.Instance.SendExistingCustomerDataApi);
                        bool success = Utils.Instance.DoFuncWithRetry(func, customer, TimeSpan.FromSeconds(2));

                        //Action action = () => Utils.Instance.SendExistingCustomerData(customer);
                        //Utils.Instance.DoWithRetry(action, TimeSpan.FromSeconds(2));

                        // If send api fails then send to fallback email
                        if (!success)
                        {
                            Email.Instance.EmailCustomerDetails(customer);
                        }
                    }
                    else
                    {
                        // Email customer details
                        Email.Instance.EmailCustomerDetails(customer);
                    }
                }
                return View("~/Views/Results/_FormConfirmation.cshtml");
            }
            catch (Exception ex)
            {
                log.Error("ExistingCustomerSubmit", ex);
                return View("~/Views/Results/_FormError.cshtml");
            }
        }
    }
}
