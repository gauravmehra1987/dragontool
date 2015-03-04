using System;
using System.Data.Linq;
using System.Linq;
using System.Reflection;
using System.Web.Mvc;
using log4net;

using Combobulator.Classes;
using Combobulator.DAL;
using Combobulator.Models;

using Car = Combobulator.Models.Car;
using Dealer = Combobulator.Models.Dealer;
using Title = Combobulator.Models.Title;

namespace Combobulator.Controllers
{
	public class ResultsController : Controller
	{
		private CombobulatorDataContext dbContext = new CombobulatorDataContext();
		private static readonly ILog log = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);

		public ActionResult Index()
		{
			string userId = String.Empty;
			string modelCode = String.Empty;
			Selections selections = new Selections();

			// customer id
			if (!String.IsNullOrEmpty(Request.QueryString["cid"]))
			{
				userId = Request.QueryString["cid"];
			}
			// model code
			if (!String.IsNullOrEmpty(Request.QueryString["model"]))
			{
				modelCode = Request.QueryString["model"];
			}
			else
			{
				string cQuery = userId != String.Empty ? ("?cid=" + userId) : "";
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

				Car car = null;
				if (!String.IsNullOrEmpty(modelCode))
				{
					car = new Car
					{
						ModelCode = modelCode
					};
				}

				if (id != String.Empty)
				{
					// Get customer from id
					Customer customer = Utils.GetCustomerById(id);
					customer.Car = car;
					customer.Selections = selections;
					customer.Titles = queryTitles.ToList();
					customer.Dealers = queryDealers.ToList();

					view = PartialView("_ExistingCustomerForm", customer);
				}
				else
				{
					Customer customer = new Customer();
					customer.Car = car;
					customer.Selections = selections;
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
			if (String.IsNullOrEmpty(modelCode))
			{
				return PartialView("_ResultError");
			}

			try
			{
				DAL.Car dbCar = dbContext.GetCar(modelCode).FirstOrDefault();
				// ReSharper disable once PossibleNullReferenceException
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
