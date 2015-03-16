using System;
using System.Data.Linq;
using System.Linq;
using System.Reflection;
using System.Web.Mvc;
using log4net;
using Combobulator.Classes;
using Combobulator.DAL;
using Combobulator.Models;
using Combobulator.Business.ViewModels;

namespace Combobulator.Controllers
{
	public class ResultsController : BaseController
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
			ViewBag.UserId = userId;
			ViewBag.ModelCode = modelCode;
			return View();
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
                var dbCar = dbContext.GetNewCar(modelCode).FirstOrDefault();
                var dbFinance = dbContext.GetCarFinance(dbCar.Id).FirstOrDefault();
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
                    Finance = new Combobulator.Models.Finance
                    {
                        Info = dbCar.Terms,
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
