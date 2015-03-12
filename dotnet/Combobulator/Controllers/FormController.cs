using System;
using System.Data.Linq;
using System.Linq;
using System.Reflection;
using System.Web.Mvc;
using log4net;
using Combobulator.Classes;
using Combobulator.Business.ViewModels;
using Combobulator.DAL;
using Combobulator.Models;
using Car = Combobulator.Models.Car;
using Dealer = Combobulator.Models.Dealer;
using Title = Combobulator.Models.Title;

namespace Combobulator.Controllers
{
    public class FormController : BaseController
    {
		private CombobulatorDataContext dbContext = new CombobulatorDataContext();

        public ActionResult Index()
        {
            string userId = String.Empty;
            string modelCode = String.Empty;
            Selections selections = new Selections();

            // customer id
            if (!String.IsNullOrEmpty(Request.QueryString["c"]))
            {
                userId = Request.QueryString["c"];
            }
            // model code
            if (!String.IsNullOrEmpty(Request.QueryString["m"]))
            {
                modelCode = Request.QueryString["m"];
            }
            else
            {
                string cQuery = userId != String.Empty ? ("?c=" + userId) : "";
                return Redirect(String.Concat("~/", cQuery));
            }
            // capacity
            if (!String.IsNullOrEmpty(Request.QueryString["capacity"]))
            {
                selections.Capacity = Request.QueryString["capacity"];
            }
            // luggage
            if (!String.IsNullOrEmpty(Request.QueryString["luggage"]))
            {
                selections.Luggage = Request.QueryString["luggage"];
            }
            // options
            if (!String.IsNullOrEmpty(Request.QueryString["options"]))
            {
                selections.Options = Request.QueryString["options"];
            }
            // price
            if (!String.IsNullOrEmpty(Request.QueryString["price"]))
            {
                selections.PriceRange = Request.QueryString["price"];
            }
            // performance
            if (!String.IsNullOrEmpty(Request.QueryString["performance"]))
            {
                selections.Performance = Request.QueryString["performance"];
            }
            // economny
            if (!String.IsNullOrEmpty(Request.QueryString["economy"]))
            {
                selections.Economy = Request.QueryString["economy"];
            }
            // use
            if (!String.IsNullOrEmpty(Request.QueryString["use"]))
            {
                selections.Use = Request.QueryString["use"];
            }

            ViewBag.UserId = userId;
            ViewBag.ModelCode = modelCode;
            ViewBag.Selections = selections;
            return View();
        }

        [ChildActionOnly]
        public ActionResult CustomerForm(string id, string modelCode, Selections selections)
        {
            PartialViewResult view;
            try
            {
                // Build drop downs
                IMultipleResults dbLookups = dbContext.GetLookupsResults();
                var queryTitles = dbLookups.GetResult<Title>().ToList<Title>();
                var queryDealers = dbLookups.GetResult<Dealer>().ToList<Dealer>();

                Combobulator.Models.NewCar car = null;
                if (!String.IsNullOrEmpty(modelCode))
                {
                    DAL.NewCar dbCar = dbContext.GetNewCar(modelCode).FirstOrDefault();
                    car = new Combobulator.Models.NewCar
                    {
                        Code = dbCar.Code
                    };
                }
                var customer = new Customer();
                if (id != String.Empty)
                {
                    // Get customer from id
                    customer = Utils.GetCustomerById(id);
                }
                customer.Car = car;
                customer.Selections = selections;
                customer.Titles = queryTitles.ToList();
                customer.Dealers = queryDealers.ToList();
                view = PartialView("_CustomerForm", customer);
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
            if (String.IsNullOrEmpty(modelCode))
            {
                return PartialView("_ResultError");
            }

            try
            {
                DAL.NewCar dbCar = dbContext.GetNewCar(modelCode).FirstOrDefault();
                var dbFinance = dbCar.Finances.First();
                var viewModel = new CarViewModel
                {
                    Code = dbCar.Code,
                    Color = dbCar.Color,
                    Engine = dbCar.Engine,
                    Name = dbCar.Name,
                    Capacity = dbCar.Capacity,
                    Luggage = dbCar.Luggage,
                    Lifestyle = dbCar.Lifestyle,
                    Awd = dbCar.Awd,
                    High = dbCar.High,
                    Convertible = dbCar.Convertible,
                    Price = dbCar.Price,
                    Cost = dbCar.Cost,
                    Speed = dbCar.Speed,
                    Mph = dbCar.Mph,
                    Economy = dbCar.Economy,
                    Alt_1 = dbCar.Alt1,
                    Alt_2 = dbCar.Alt2,
                    Alt_3 = dbCar.Alt3,
                    Terms = dbCar.Terms,
                    FinanceDetails = new FinanceDetails
                    {
                        Term = dbFinance.Term ?? 0,
                        Payment = dbFinance.Payment ?? 0.0,
                        FinancePrice = dbFinance.FinancePrice ?? 0.0,
                        Deposit = dbFinance.Deposit ?? 0.0,
                        Contribution = dbFinance.Contribution ?? 0.0,
                        PurchaseFee = dbFinance.PurchaseFee ?? 0.0,
                        FinalPayment = dbFinance.FinalPayment ?? 0.0,
                        CreditCharge = dbFinance.CreditCharge ?? 0.0,
                        ROI = dbFinance.ROI,
                        APR = dbFinance.APR,
                    }
                };
                return PartialView("_ResultDetail", viewModel);
            }
            catch (Exception ex)
            {
                log.Error("ResultDetail", ex);
                return PartialView("_ResultError");
            }
        }
    }
}
