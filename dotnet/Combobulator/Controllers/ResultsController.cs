using System;
using System.Linq;
using System.Web.Mvc;
using Combobulator.Business.ViewModels;
using Combobulator.Data;

namespace Combobulator.Controllers
{
	public class ResultsController : BaseController
	{
		private readonly CombobulatorDataContext _dbContext = new CombobulatorDataContext();

        /// <summary>
        /// Renders a view on screen.
        /// </summary>
        /// <returns></returns>
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
	    /// Retrieves a car model and finance details from the database and renders it on screen.
	    /// </summary>
	    /// <param name="modelCode">Model code.</param>
	    /// <returns>Renders a partial view on screen.</returns>
	    [ChildActionOnly]
	    [HttpGet]
	    public ActionResult ResultDetail(string modelCode, string userId)
	    {
	        if (String.IsNullOrEmpty(modelCode))
	        {
	            return PartialView("_ResultError");
	        }

	        var dbCar = _dbContext.GetCar(modelCode).FirstOrDefault();
	        if (dbCar == null)
	            return RedirectToAction("Index", "Home");

	        var dbFinance = _dbContext.GetCarFinance(dbCar.Id).FirstOrDefault();
	        if (dbFinance == null)
	            return RedirectToAction("Index", "Home");

	        var viewModel = new CarViewModel
	        {
	            Brand = Common.Config.Brand,
	            Code = dbCar.Code,
	            Model = dbCar.Model,
	            Color = dbCar.Color,
	            Engine = dbCar.Engine,
	            Engine_Name = dbCar.EngineName,
	            Url = dbCar.Url,
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
	        ViewBag.UserId = userId;

	        return PartialView("_ResultDetail", viewModel);
	    }
	}
}
