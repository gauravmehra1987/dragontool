using Combobulator.Classes;
using Combobulator.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Combobulator.Controllers
{
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {
            string userId = string.Empty;
            Customer customer = null;

            if (!string.IsNullOrEmpty(Request.QueryString["c"]))
            {
                try
                {
                    customer = Utils.GetCustomerById(Request.QueryString["c"]);
                }
                catch (Exception ex)
                {
                    log.Error("GetCustomerById", ex);
                }
            }

            ViewBag.FirstName = customer != null ? customer.FirstName : "";
            ViewBag.UserId = Request.QueryString["c"];
            return View();
        }
    }
}
