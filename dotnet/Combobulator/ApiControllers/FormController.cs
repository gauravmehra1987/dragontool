using Combobulator.Models;
using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Combobulator.Business.Commands;
using Combobulator.Business.ViewModels;
using Combobulator.Common.Extensions;

namespace Combobulator.ApiControllers
{
    public class FormController : BaseController
    {
        // POST api/form
        /// <summary>
        /// Posts the specified form and returns a status.
        /// </summary>
        /// <param name="form">Form collection</param>
        /// <returns>Success of failure.</returns>
        [HttpPost]
        public HttpResponseMessage Post([FromBody] CustomerViewModel form)
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
                    RequestCallback = form.Fields.Callback != "1" ? true : false,
                    UserId = form.Fields.UserId,
                    Selections = new Selections
                    {
                        Capacity = form.Input.Seats.CountCharacterFrequency(0).ToString(),
                        Luggage = form.Input.Luggage,
                        PriceRange = form.Input.Price,
                        Performance = form.Input.Speed,
                        Use = form.Input.Lifestyle,
                        Economy = form.Input.Mpg,
                        Options = new Models.Options
                        {
                            AWD = form.Input.Options.awd,
                            DT = form.Input.Options.dt,
                            HP = form.Input.Options.hp,
                            TP = form.Input.Options.tp
                        }
                    }
                };
                var carModel = form.Car;
                var command = new SendCustomerDataCommand(customer, carModel);
                var result = command.Execute();
                return Request.CreateResponse(HttpStatusCode.OK, !result ? "error" : "success");
            }
            catch (Exception ex)
            {
                Log.Error("api/form", ex);
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
        }
    }
}
