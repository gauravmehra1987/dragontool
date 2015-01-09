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

        public ActionResult Index(string id)
        {
            ViewBag.UserId = id;
            return View();
        }

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

                if (customer.EmailResults == true)
                {
                    Email.SendEmailResults(customer);
                }
                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
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
            if (id != null)
            {
                view = PartialView("ExistingCustomerForm", customer);
            }
            else
            {
                view = PartialView("NewCustomerForm", customer);
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
            
            return PartialView("ResultDetail", car);
        }
    }
}
