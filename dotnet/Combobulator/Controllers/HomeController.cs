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
        public ActionResult Index()
        {
            string userId = string.Empty;
            Customer customer = null;

            if (!string.IsNullOrEmpty(Request.QueryString["c"]))
            {
                customer = new Customer
                {
                    UserId = Request.QueryString["c"],
                    FirstName = "Customer",
                    LastName = "Customer",
                    Email = "keith.vong@iris-worldwide.com",
                    TelephoneHome = "01234567890"
                };
            }

            ViewBag.FirstName = customer != null ? customer.FirstName : "";

            return View();
        }
    }
}
