using Combobulator.Classes;
using Combobulator.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Combobulator.Controllers
{
    public class CustomerController : Controller
    {
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

                if (ViewData.ModelState.IsValid)
                {
                    if (customer.EmailResults == true)
                    {
                        Email.Instance.SendEmailResults(customer);
                    }

                    Utils.Instance.SendNewCustomerData(customer);
                }
                return View("~/Views/Results/_FormConfirmation.cshtml");
            }
            catch
            {
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

                if (ViewData.ModelState.IsValid)
                {
                    if (customer.EmailResults == true)
                    {
                        Email.Instance.SendEmailResults(customer);
                    }

                    Utils.Instance.SendExistingCustomerData(customer);
                }
                return View("~/Views/Results/_FormConfirmation.cshtml");
            }
            catch
            {
                return View("~/Views/Results/_FormError.cshtml");
            }
        }
    }
}
