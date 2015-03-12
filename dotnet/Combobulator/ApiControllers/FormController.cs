using Combobulator.Classes;
using Combobulator.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Combobulator.ApiControllers
{
    public class FormController : Combobulator.ApiControllers.BaseController
    {
        //private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        private Combobulator.DAL.CombobulatorDataContext dbContext = new Combobulator.DAL.CombobulatorDataContext();

        // POST api/form
        [System.Web.Mvc.HttpPost]
        public HttpResponseMessage Post([FromBody]Customer customer)
        {
            try
            {
                var dbCar = dbContext.GetNewCar(customer.Car.Code).FirstOrDefault();
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
                    Terms = "",
                    Alt_1 = dbCar.Alt1,
                    Alt_2 = dbCar.Alt2,
                    Alt_3 = dbCar.Alt3
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
