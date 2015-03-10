using System;
using System.Data.Linq;
using System.Linq;
using System.Reflection;
using System.Web.Mvc;
using log4net;
using Combobulator.Classes;
using Combobulator.DAL;
using Combobulator.Models;

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
	}
}
