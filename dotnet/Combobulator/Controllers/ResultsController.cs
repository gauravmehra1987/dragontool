using Combobulator.Classes;
using Combobulator.Models;
using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Combobulator.Controllers
{
    public class ResultsController : Controller
    {
        private Combobulator.DAL.CombobulatorDataContext dbContext = new Combobulator.DAL.CombobulatorDataContext();
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        public ActionResult Index()
        {
            string userId = string.Empty;
            if (!string.IsNullOrEmpty(Request.QueryString["c"]))
            {
                userId = Request.QueryString["c"];
            }

            string modelCode = string.Empty;
            if (!string.IsNullOrEmpty(Request.QueryString["m"]))
            {
                modelCode = Request.QueryString["m"];
            }
            else
            {
                string cQuery = userId != string.Empty ? ("?c=" + userId) : "";
                return Redirect(string.Format("~/{0}", cQuery));
            }

            ViewBag.UserId = userId;
            ViewBag.ModelCode = modelCode;

            return View();
        }

        [ChildActionOnly]
        public ActionResult CustomerForm(string id)
        {
            PartialViewResult view = null;

            try
            {
                // Build drop downs
                IMultipleResults dbLookups = dbContext.GetLookupsResults();
                var queryTitles = dbLookups.GetResult<Title>().ToList<Title>();
                var queryDealers = dbLookups.GetResult<Dealer>().ToList<Dealer>();  

                if (id != string.Empty)
                {
                    // Get customer from id
                    Customer customer = Utils.Instance.GetCustomerById(id);
                    customer.Titles = queryTitles.ToList();
                    customer.Dealers = queryDealers.ToList();

                    view = PartialView("_ExistingCustomerForm", customer);
                }
                else
                {
                    Customer customer = new Customer();
                    customer.Titles = queryTitles.ToList();
                    customer.Dealers = queryDealers.ToList();

                    view = PartialView("_ExistingCustomerForm", customer);
                }
            }
            catch (Exception ex)
            {
                log.Error("CustomerForm", ex);
                view = PartialView("_FormError");
            }

            return view;
        }

        [ChildActionOnly]
        public ActionResult ResultDetail(string modelCode)
        {
            if (string.IsNullOrEmpty(modelCode))
            {
                return PartialView("_ResultError");
            }

            try
            {
                Combobulator.DAL.Car dbCar = dbContext.GetCar(modelCode).FirstOrDefault();
                Car car = new Car
                {
                    Id = dbCar.Id,
                    Model = dbCar.Model,
                    ModelCode = dbCar.ModelCode,
                    Colour = dbCar.Colour,
                    Engine = dbCar.Engine,
                    DisplayName = dbCar.DisplayName,
                    Type = dbCar.Type,
                    CapacityScale = dbCar.CapacityScale,
                    LuggageScale = dbCar.LuggageScale,
                    Options = dbCar.Options,
                    PriceScale = dbCar.PriceScale,
                    Cost = dbCar.Cost,
                    PerformanceScale = dbCar.PerformanceScale,
                    MPH = dbCar.MPH,
                    EconomyScale = dbCar.EconomyScale,
                    MPG = dbCar.MPG,
                    UsageScale = dbCar.UsageScale,
                    Alt1 = dbCar.Alt1,
                    Alt2 = dbCar.Alt2,
                    Alt3 = dbCar.Alt3,
                    TermsConditions = dbCar.TermsConditions
                };
                return PartialView("_ResultDetail", car);
            }
            catch (Exception ex)
            {
                log.Error("ResultDetail", ex);
                return PartialView("_ResultError");
            }
        }
    }
}
