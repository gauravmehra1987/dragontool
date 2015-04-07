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
                try
                {
                    var command = new GetCustomerDataCommand(Request.QueryString["c"]);
                    customer = command.Execute();
                    //customer = Utils.GetCustomerById(Request.QueryString["c"]);
                }
                catch (Exception ex)
                {
                    Log.Error("GetCustomerById", ex);
                }
            }

            ViewBag.FirstName = customer != null ? customer.FirstName : "";
            ViewBag.UserId = Request.QueryString["c"];
            return View();
        }
    }
}
