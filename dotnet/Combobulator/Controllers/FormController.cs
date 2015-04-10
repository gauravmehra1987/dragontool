using System;
using System.Linq;
using System.Net;
using System.Net.Http;
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

            return View(viewModel);
        }

        [HttpPost]
        [ValidateAjaxAntiForgeryToken]
        public ActionResult Submit(FormCollection collection)
        {
            try
            {
                var isphone = collection["form[optout-phone]"] ?? "true";
                var ispost = collection["form[optout-post]"] ?? "true";
                var addresstype = collection["form[address-type]"];

                var customer = new Customer
                {
                    AddressLine1 = collection["form[address-1]"],
                    AddressLine2 = collection["form[address-2]"],
                    AddressPostcode = collection["form[postcode]"],
                    Dealer = collection["form[dealer]"],
                    Email = collection["form[email]"],
                    FirstName = collection["form[name]"],
                    LastName = collection["form[surname]"],
                    Title = collection["form[title]"],
                    TelephoneMobile = collection["form[tel-mobile]"],
                    TelephoneHome = collection["form[tel-home]"],
                    TelephoneWork = collection["form[tel-work]"],
                    IsFinance = collection["form[finance]"] != "1",
                    AddressType = addresstype,
                    IsPhone = isphone == "true" ? true : false,
                    IsPost = ispost == "true" ? true : false,
                    
                    UserId = collection["form[UserId]"],
                    Selections = new Selections
                    {
                        Capacity = collection["input[seats][]"].Split(',').CountCharacterFrequency(0).ToString(),
                        Luggage = collection["input[luggage]"],
                        PriceRange = collection["input[price]"],
                        Performance = collection["input[speed]"],
                        Use = collection["input[lifestyle]"],
                        Economy = collection["input[mpg]"],
                        Options = new Options
                        {
                            AWD = collection["input[options][awd]"],
                            DT = collection["input[options][dt]"],
                            HP = collection["input[options][hp]"],
                            TP = collection["input[options][tp]"]
                        }
                    }
                };
                var carModel = collection["car"];
                var template = Common.Config._emailCustomerResultsTemplate;
                var command = new SendCustomerDataCommand(customer, carModel, Server.MapPath(template));
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
