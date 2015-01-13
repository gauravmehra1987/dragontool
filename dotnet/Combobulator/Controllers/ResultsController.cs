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
            ViewBag.UserId = userId;
            return View();
        }

        [ChildActionOnly]
        public ActionResult CustomerForm(string id)
        {
            // Get customer from session

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

            Customer customer = new Customer();
            customer.Titles = queryTitles.ToList();
            customer.Dealers = queryDealers.ToList();

            PartialViewResult view = null;
            if (id != string.Empty)
            {
                customer.UserId = id;
                view = PartialView("_ExistingCustomerForm", customer);
            }
            else
            {
                view = PartialView("_NewCustomerForm", customer);
            }

            return view;
        }

        [ChildActionOnly]
        public ActionResult ResultDetail()
        {
            string modelCode = "XN12";

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
                ImageURL = dbCar.ImageURL,
                TermsConditions = dbCar.TermsConditions
            };
            
            return PartialView("_ResultDetail", car);
        }
    }
}
