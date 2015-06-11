using System;
using System.Web.Mvc;
using Combobulator.Models;
using Combobulator.Business.Commands;

namespace Combobulator.Controllers
{
    public class HomeController : BaseController
    {
        /// <summary>
        /// Retrieves a customer details and renders a view on the screen.
        /// </summary>
        /// <returns>Renders a view on screen.</returns>
        public ActionResult Index()
        {
            Customer customer = null;
            if (!string.IsNullOrEmpty(Request.QueryString["c"]))
            {
                int customerId;
                var isInteger = Int32.TryParse(Request.QueryString["c"], out customerId);
                if (isInteger)
                {
                    var command = new GetCustomerDataCommand(customerId);
                    customer = command.Execute();
                    ViewBag.UserId = customerId.ToString();
                }
            }
            ViewBag.FirstName = customer != null ? customer.FirstName : "";
            return View();
        }
    }
}
