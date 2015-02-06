using Combobulator.Classes;
using Combobulator.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Combobulator.Controllers
{
    public class FormController : ApiController
    {
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        private Combobulator.DAL.CombobulatorDataContext dbContext = new Combobulator.DAL.CombobulatorDataContext();

        // POST api/form
        [System.Web.Mvc.HttpPost]
        public HttpResponseMessage Post([FromBody]Customer customer)
        {
            try
            {
                Combobulator.DAL.Car dbCar = dbContext.GetCar(customer.Car.ModelCode).FirstOrDefault();
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
