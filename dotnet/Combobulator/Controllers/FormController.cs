using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.InteropServices;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.UI.WebControls.WebParts;
using Combobulator.Business.Commands;
using Combobulator.Classes;
using Combobulator.Business.ViewModels;
using Combobulator.Common.Extensions;
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

        [System.Web.Mvc.HttpPost]
        [ValidateAntiForgeryToken] 
        public HttpResponseMessage Submit()
        {
            try
            {
                /*
                var customer = new Customer
                {
                    AddressLine1 = form.Fields.Address_1,
                    AddressLine2 = form.Fields.Address_2,
                    AddressLine3 = form.Fields.Address_3,
                    AddressPostcode = form.Fields.Postcode,
                    Dealer = form.Fields.Dealer,
                    Email = form.Fields.Email,
                    FirstName = form.Fields.Name,
                    LastName = form.Fields.Surname,
                    Title = form.Fields.Title,
                    TelephoneMobile = form.Fields.Mobile,
                    TelephoneHome = form.Fields.Home,
                    TelephoneWork = form.Fields.Work,
                    RequestCallback = form.Fields.Callback != "1" ? true : false,
                    UserId = form.Fields.UserId,
                    Selections = new Selections
                    {
                        Capacity = form.Input.Seats.CountCharacterFrequency(0).ToString(),
                        Luggage = form.Input.Luggage,
                        PriceRange = form.Input.Price,
                        Performance = form.Input.Speed,
                        Use = form.Input.Lifestyle,
                        Economy = form.Input.Mpg,
                        Options = new Models.Options
                        {
                            AWD = form.Input.Options.awd,
                            DT = form.Input.Options.dt,
                            HP = form.Input.Options.hp,
                            TP = form.Input.Options.tp
                        }
                    }
                };
                var carModel = form.Car;
                */
                var customer = new Customer();
                var carModel = "RKT";
                var command = new SendCustomerDataCommand(customer, carModel);
                var result = command.Execute();

                // Create a 201 response.
                var response = new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new StringContent("success")
                };
                return response;

                //return Request.CreateResponse(HttpStatusCode.OK, !result ? "error" : "success");
            }
            catch (Exception ex)
            {
                throw ex;
                //return Request.CreateResponse(HttpStatusCode.BadRequest);
                //return Request.CreateResponse(HttpStatusCode.NotFound);
            }
        }
    }
}
