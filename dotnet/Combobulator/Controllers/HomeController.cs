using Combobulator.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Combobulator.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index(string id)
        {
            Customer customer = null;
            if (id != null)
            {
                // Call eMaster API to get user details

                // Populate customer object
                customer = new Customer
                {
                    UserId = id,
                    FirstName = "Keith",
                    LastName = "Vong",
                    Email = "keith.vong@iris-worldwide.com",
                    TelephoneHome = "01234567890"

                };
            }

            ViewBag.FirstName = customer != null ? customer.FirstName : "";

            return View();
        }
    }
}
