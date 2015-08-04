using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Combobulator.Business.Commands;
using Combobulator.Business.ViewModels;
using Combobulator.Common.Enums;
using Combobulator.Common.Extensions;
using Combobulator.Data;
using Combobulator.Helpers;
using Combobulator.Models;
using Newtonsoft.Json;
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
            if (!String.IsNullOrEmpty(Request.QueryString["c"]))
            {
                customerId = Request.QueryString["c"];

                var command = new GetCustomerDataCommand(Int32.Parse(customerId));
                var customer = command.Execute();
                viewModel = new FormViewModel
                {
                    FirstName = customer.FirstName.ToLower().ToTitleCase(),
                    LastName = customer.LastName.ToLower().ToTitleCase(),
                    Email = customer.Email.ToLower()
                };
            }
            if (!String.IsNullOrEmpty(Request.QueryString["m"]))
            {
                modelCode = Request.QueryString["m"];
            }
            else
            {
                var cQuery = customerId != String.Empty ? ("?c=" + customerId) : "";
                return RedirectToAction("Index", "Home", cQuery);
            }

            var result = new List<Title>();
            var values = Enum.GetValues(typeof(Salutation));
            foreach (var item in values)
            {
                result.Add(new Title { Id = (int)item, Name = item.ToString() });
            }

            viewModel.Titles = result.ToList();
            viewModel.Code = modelCode;

            var car = _dbContext.GetCar(modelCode).SingleOrDefault();
            if (car != null)
            {
                ViewBag.ModelName = car.Name;
            }
            ViewBag.UserId = customerId;
            ViewBag.ModelCode = modelCode;
            ViewBag.EngineName = car.EngineName;
            ViewBag.Brand = car.Brand;
            ViewBag.Url = car.Url;
            ViewBag.ModelName = car.Name;
            ViewBag.Model = car.Model;

            if (!string.IsNullOrEmpty(customerId))
            {
                viewModel.UserId = Int32.Parse(customerId);
            }
            return View(viewModel);
        }

        [HttpPost]
        [ValidateAjaxAntiForgeryToken]
        public ActionResult Submit(FormSubmissionViewModel viewModel)
        {
            if (!ModelState.IsValid)
            {
                Response.StatusCode = 400;
                Response.TrySkipIisCustomErrors = true;
                return Json(ModelState.AllErrors());
            }
            var isEmail = viewModel.info.optout_email == null;
            var isPhone = viewModel.info.optout_phone == null;
            var isPost = viewModel.info.optout_post == null;
            var customer = new Customer
            {
                AddressLine1 = viewModel.info.address_1,
                AddressLine2 = viewModel.info.address_2,
                AddressLine3 = viewModel.info.address_3,
                Town = viewModel.info.town,
                AddressPostcode = viewModel.info.postcode,
                Dealer = viewModel.info.dealer,
                Email = viewModel.info.email,
                FirstName = viewModel.info.name,
                LastName = viewModel.info.surname,
                Title = viewModel.info.title,
                TelephoneMobile = viewModel.info.tel_mobile,
                TelephoneHome = viewModel.info.tel_home,
                TelephoneWork = viewModel.info.tel_work,
                AddressType = viewModel.info.address_type,
                IsEmail = isEmail,
                IsPhone = isPhone,
                IsPost = isPost,
                UserId = viewModel.info.userid,

                Selections = new Selections
                {
                    Capacity = string.Join(",", viewModel.input.seats),
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
            var json = JsonConvert.SerializeObject(viewModel);
            Log.Info("Data: " + json);

            var carModel = viewModel.car;
            var command = new SendCustomerDataCommand(customer, carModel,
                Server.MapPath(Common.Config.EmailHTMLTemplate), Server.MapPath(Common.Config.EmailTextTemplate));
            var dataSent = command.Execute();
            if (!dataSent)
            {
                throw new HttpException((Int32) HttpStatusCode.InternalServerError, "An error occured sending data");
            }
            Response.StatusCode = 201;
            Response.StatusDescription = "success";
            return Json("success");
        }
    }
}
