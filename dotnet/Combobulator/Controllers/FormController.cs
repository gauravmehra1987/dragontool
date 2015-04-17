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

            Customer customer = null;
            var command = new GetCustomerDataCommand(userId);
            customer = command.Execute();
            var viewModel = new FormViewModel();
            viewModel.FirstName = customer.FirstName;
            viewModel.LastName = customer.LastName;
            viewModel.Email = customer.Email;
            viewModel.Code = modelCode;

            var titles = _dbContext.GetTitles().ToList();
            viewModel.Titles = titles.Select(x => new Title
            {
                Id = x.Id,
                Name = x.Name
            }).ToList();

            ViewBag.UserId = userId;
            ViewBag.ModelCode = modelCode;
            if (userId != "")
            {
                viewModel.UserId = Int32.Parse(userId);
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
