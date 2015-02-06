﻿using Combobulator.Classes;
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
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        public ActionResult Index()
        {
            string userId = string.Empty;
            Customer customer = null;

            if (!string.IsNullOrEmpty(Request.QueryString["cid"]))
            {
                try
                {
                    customer = Utils.GetCustomerById(Request.QueryString["cid"]);
                }
                catch (Exception ex)
                {
                    log.Error("GetCustomerById", ex);
                }
            }

            ViewBag.FirstName = customer != null ? customer.FirstName : "";
            ViewBag.UserId = Request.QueryString["cid"];

            return View();
        }
    }
}
