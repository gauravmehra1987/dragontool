using System;
using System.Linq;
using System.Web.Mvc;
using Combobulator.Business.Commands;
using Combobulator.Business.ViewModels;
using Combobulator.Common.Extensions;
using Combobulator.Data;
using Combobulator.Helpers;
using Combobulator.Models;
using Options = Combobulator.Models.Options;
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
            var customerId = String.Empty;
            string modelCode;

            var viewModel = new FormViewModel();
            // customer id
            if (!String.IsNullOrEmpty(Request.QueryString["c"]))
            {
                customerId = Request.QueryString["c"];

                var command = new GetCustomerDataCommand(Int32.Parse(customerId));
                var customer = command.Execute();
                viewModel = new FormViewModel
                {
                    FirstName = customer.FirstName,
                    LastName = customer.LastName,
                    Email = customer.Email
                };
            }
            // model code
            if (!String.IsNullOrEmpty(Request.QueryString["m"]))
            {
                modelCode = Request.QueryString["m"];
            }
            else
            {
                var cQuery = customerId != String.Empty ? ("?c=" + customerId) : "";
                return RedirectToAction("Index", "Home", cQuery);
            }

            var titles = _dbContext.GetTitles().ToList();
            viewModel.Titles = titles.Select(x => new Title
            {
                Id = x.Id,
                Name = x.Name
            }).ToList();
            viewModel.Code = modelCode;

            var car = _dbContext.GetNewCar(modelCode).SingleOrDefault();
            if (car != null)
            {
                ViewBag.ModelName = car.Name;
            }
            ViewBag.UserId = customerId;
            ViewBag.ModelCode = modelCode;

            if (!string.IsNullOrEmpty(customerId))
            {
                viewModel.UserId = Int32.Parse(customerId);
            }
            return View(viewModel);
        }

        [HttpPost]
        [ValidateAjaxAntiForgeryToken]
        public ActionResult Submit(TestViewModel viewModel)
        {
            if (!ModelState.IsValid)
            {
                Response.StatusCode = 400;
                Response.TrySkipIisCustomErrors = true;

                var modelErrors = ModelState.AllErrors();
                return Json(modelErrors);
            }
            try
            {
                var isPhone = viewModel.info.optout_phone == null;
                var isPost = viewModel.info.optout_post == null;

                var customer = new Customer
                {
                    AddressLine1 = viewModel.info.address_1,
                    AddressLine2 = viewModel.info.address_2,
                    AddressLine3 = viewModel.info.address_3,
                    AddressPostcode = viewModel.info.postcode,
                    Dealer = viewModel.info.dealer,
                    Email = viewModel.info.email,
                    FirstName = viewModel.info.name,
                    LastName = viewModel.info.surname,
                    Title = viewModel.info.title,
                    TelephoneMobile = viewModel.info.tel_mobile,
                    TelephoneHome = viewModel.info.tel_home,
                    TelephoneWork = viewModel.info.tel_work,
                    IsFinance = viewModel.info.finance,
                    AddressType = viewModel.info.address_type_work ? "work" : "home",
                    IsPhone = isPhone,
                    IsPost = isPost,
                    UserId = viewModel.info.userid,
                    
                    Selections = new Selections
                    {
                        Capacity = viewModel.input.seats.CountCharacterFrequency(0).ToString(),
                        Luggage = viewModel.input.luggage,
                        PriceRange = viewModel.input.price.ToString(),
                        Performance = viewModel.input.speed,
                        Use = viewModel.input.lifestyle,
                        Economy = viewModel.input.mpg.ToString(),
                        Options = new Options
                        {
                            AWD = viewModel.input.options.awd.ToString(),
                            DT = viewModel.input.options.dt.ToString(),
                            HP = viewModel.input.options.hp.ToString(),
                            TP = viewModel.input.options.tp.ToString()
                        }
                        
                    }
                };
                var carModel = viewModel.car;
                var template = Common.Config._emailMeResultsTemplate;
                var customerTemplate = Common.Config._emailCustomerResultsTemplate;
                var command = new SendCustomerDataCommand(customer, carModel, Server.MapPath(template), Server.MapPath(customerTemplate));
                var dataSent = command.Execute();
                if (!dataSent)
                {
                    Response.StatusCode = 500;
                    Response.StatusDescription = "error";
                    return Json("error");
                }
                Response.StatusCode = 201;
                Response.StatusDescription = "success";
                return Json("success");
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                Response.StatusCode = 500;
                return Json("error");
            }
        }
    }
}
