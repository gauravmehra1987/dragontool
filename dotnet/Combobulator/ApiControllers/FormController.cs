using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using Combobulator.Business.Commands;
using Combobulator.Helpers;
using Combobulator.Models;

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
        [ValidateAjaxAntiForgeryToken]
        public HttpResponseMessage Post(FormDataCollection collection)
        {
            var valueMap = NameValueHelper.Convert(collection);
            try
            {
                var customer = new Customer
                {
                    AddressLine1 = valueMap["form[address-1]"],
                    AddressLine2 = valueMap["form[address-2]"],
                    AddressLine3 = valueMap["form[address-3]"],
                    AddressPostcode = valueMap["form[postcode]"],
                    Dealer = "",
                    Email = valueMap["form[email]"],
                    FirstName = valueMap["form[name]"],
                    LastName = valueMap["form[surname]"],
                    Title = valueMap["form[title]"],
                    TelephoneMobile = valueMap["form[tel-mobile]"],
                    TelephoneHome = valueMap["form[tel-home]"],
                    TelephoneWork = valueMap["form[tel-work]"],
                    IsFinance = valueMap["form[finance]"] != "1" ? true : false,
                    UserId = valueMap["form[UserId]"],
                    Selections = new Selections
                    {
                        Capacity = valueMap["input[seats][]"],
                        Luggage = valueMap["input[luggage]"],
                        PriceRange = valueMap["input[price]"],
                        Performance = valueMap["input[speed]"],
                        Use = valueMap["input[lifestyle]"],
                        Economy = valueMap["input[mpg]"],
                        Options = new Options
                        {
                            AWD = valueMap["input[options][awd]"],
                            DT = valueMap["input[options][dt]"],
                            HP = valueMap["input[options][hp]"],
                            TP = valueMap["input[options][tp]"]
                        }
                    }
                };
                var carModel = valueMap["car"];
                var template = string.Empty;
                var command = new SendCustomerDataCommand(customer, carModel, template);
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
