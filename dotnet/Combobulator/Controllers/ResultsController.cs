using Combobulator.Classes;
using Combobulator.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Combobulator.Controllers
{
    public class ResultsController : Controller
    {
        private Combobulator.DAL.CombobulatorDataContext dbContext = new Combobulator.DAL.CombobulatorDataContext();

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
            // Build drop downs
            IList<Combobulator.DAL.Title> dbTitles = dbContext.GetTitles().ToList();
            var queryTitles = from t in dbTitles select new Title
            {
                Id = t.Id,
                Name = t.Name
            };

            IList<Combobulator.DAL.Dealer> dbDealers = dbContext.GetDealers().ToList();
            var queryDealers = from d in dbDealers select new Dealer
            {
                Id = d.Id,
                Name = d.Name
            };

            PartialViewResult view = null;

            if (id != string.Empty)
            {
                // Get customer from id
                Customer customer = Utils.GetCustomerById(id);
                customer.Titles = queryTitles.ToList();
                customer.Dealers = queryDealers.ToList();

                view = PartialView("_ExistingCustomerForm", customer);
            }
            else
            {
                Customer customer = new Customer();
                customer.Titles = queryTitles.ToList();
                customer.Dealers = queryDealers.ToList();

                view = PartialView("_NewCustomerForm", customer);
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
                return PartialView("_ResultError");
            }
        }
    }
}
