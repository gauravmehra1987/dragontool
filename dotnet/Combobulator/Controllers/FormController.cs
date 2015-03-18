using System;
using System.Linq;
using System.Web.Mvc;
using Combobulator.Classes;
using Combobulator.Business.ViewModels;
using Combobulator.Data;
using Combobulator.Models;
using Dealer = Combobulator.Models.Dealer;
using Title = Combobulator.Models.Title;

namespace Combobulator.Controllers
{
    public class FormController : BaseController
    {
		private readonly CombobulatorDataContext _dbContext = new CombobulatorDataContext();

        /// <summary>
        /// Renders a view on screen.
        /// </summary>
        /// <returns>A view</returns>
        public ActionResult Index()
        {
            var userId = String.Empty;
            string modelCode;

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
                var cQuery = userId != String.Empty ? ("?c=" + userId) : "";
                return RedirectToAction("Index", "Home", cQuery);
            }
            ViewBag.UserId = userId;
            ViewBag.ModelCode = modelCode;
            return View();
        }

        /// <summary>
        /// Renders a partial view on screen.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="modelCode">The model code.</param>
        /// <param name="selections">The selection list.</param>
        /// <returns>A partial view.</returns>
        [ChildActionOnly]
        public ActionResult CustomerForm(string id, string modelCode, Selections selections)
        {
            PartialViewResult view;
            try
            {
                // Build drop downs
                var dbLookups = _dbContext.GetLookupsResults();
                var queryTitles = dbLookups.GetResult<Title>().ToList<Title>();
                var queryDealers = dbLookups.GetResult<Dealer>().ToList<Dealer>();

                Models.NewCar car = null;
                if (!String.IsNullOrEmpty(modelCode))
                {
                    var dbCar = _dbContext.GetNewCar(modelCode).FirstOrDefault();
                    if (dbCar != null)
                        car = new Models.NewCar
                        {
                            Code = dbCar.Code
                        };
                }
                var customer = new Customer();
                if (!String.IsNullOrEmpty(id))
                {
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

        /// <summary>
        /// Renders a partial view on screen.
        /// </summary>
        /// <param name="modelCode">The model code.</param>
        /// <returns>A partial view.</returns>
        [ChildActionOnly]
        public ActionResult ResultDetail(string modelCode)
        {
            if (String.IsNullOrEmpty(modelCode))
            {
                return PartialView("_ResultError");
            }

            try
            {
                var dbCar = _dbContext.GetNewCar(modelCode).FirstOrDefault();
                if (dbCar == null)
                    return PartialView("_ResultError");

                var dbFinance = _dbContext.GetCarFinance(dbCar.Id).FirstOrDefault();
                if (dbFinance == null)
                    return PartialView("_ResultError");

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
                    Finance = new Models.Finance
                    {
                        Info = dbFinance.Info,
                        Term = dbFinance.Term ?? 0,
                        Payment = dbFinance.Payment ?? 0.0,
                        Price = dbFinance.FinancePrice ?? 0.0,
                        Deposit = dbFinance.Deposit ?? 0.0,
                        Contribution = dbFinance.Contribution ?? 0.0,
                        Purchase_Fee = dbFinance.PurchaseFee ?? 0.0,
                        Final_Payment = dbFinance.FinalPayment ?? 0.0,
                        Credit_Charge = dbFinance.CreditCharge ?? 0.0,
                        ROI = dbFinance.ROI,
                        APR = dbFinance.APR
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
