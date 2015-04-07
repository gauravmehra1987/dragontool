using Combobulator.Models;
using System;
using System.Collections.Specialized;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;
using Combobulator.Business.Commands;
using Combobulator.Business.ViewModels;
using Combobulator.Helpers;

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
        //public HttpResponseMessage Post([FromBody] CustomerViewModel form)
        public HttpResponseMessage Post(FormDataCollection form)
        {
            var valueMap = NameValueHelper.Convert(form);
            try
            {
                var customer = new Customer
                {
                    AddressLine1 = valueMap["address-1"],
                    AddressLine2 = valueMap["address-2"],
                    AddressLine3 = valueMap["address-3"],
                    AddressPostcode = valueMap["postcode"],
                    Dealer = "",
                    Email = valueMap["email"],
                    FirstName = valueMap["name"],
                    LastName = valueMap["surname"],
                    Title = valueMap["title"],
                    TelephoneMobile = valueMap["tel-mobile"],
                    TelephoneHome = valueMap["tel-home"],
                    TelephoneWork = valueMap["tel-work"],
                    RequestCallback = valueMap["finance"] != "1" ? true : false,
                    UserId = valueMap["UserId"],
                    Selections = new Selections
                    {
                        Capacity = "0",
                        Luggage = valueMap["luggage"],
                        PriceRange = valueMap["price"],
                        Performance = valueMap["speed"],
                        Use = valueMap["lifestyle"],
                        Economy = valueMap["mpg"],
                        Options = new Models.Options
                        {
                            AWD = valueMap["awd"],
                            DT = valueMap["dt"],
                            HP = valueMap["hp"],
                            TP = valueMap["tp"]
                        }
                    }
                };

                /*
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
                var customer = new Customer();
                */
                //var carModel = form.Car;
                var carModel = valueMap["car"];
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
