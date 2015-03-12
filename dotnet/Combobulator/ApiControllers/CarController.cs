using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Reflection;
using System.Web.Http;
using System.Web.Script.Serialization;
using Combobulator.DAL;
using Combobulator.Helpers;
using Combobulator.Models;
using Combobulator.Business.ViewModels;
using log4net;
using Newtonsoft.Json;
using Car = Combobulator.DAL.Car;
using NewCar = Combobulator.Models.NewCar;

namespace Combobulator.ApiControllers
{
    public class CarController : Combobulator.ApiControllers.BaseController
    {
        private int apiCacheDurationHours = Convert.ToInt32(ConfigurationManager.AppSettings["ApiCacheDurationHours"]);
        private bool apiCacheEnabled = Convert.ToBoolean(ConfigurationManager.AppSettings["ApiCacheEnabled"]);
        private CombobulatorDataContext dbContext = new CombobulatorDataContext();
        //private static readonly ILog log = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);

        // GET api/car
        // Gets all cars
        [DeflateCompression]
        [System.Web.Mvc.HttpGet]
        public HttpResponseMessage GetCars()
        {
            var serializer = new JavaScriptSerializer();
            HttpResponseMessage response = new HttpResponseMessage();
            try
            {
                var dbCar = dbContext.GetNewCars().ToList();
                var viewModel = new List<CarViewModel>();
                foreach (var car in dbCar)
                {
                    var finance = dbContext.GetCarFinance(car.Id).First();
                    viewModel.Add(new CarViewModel
                    {
                        Code = car.Code,
                        Color = car.Color,
                        Engine = car.Engine,
                        Name = car.Name,
                        Capacity = car.Capacity,
                        Luggage = car.Luggage,
                        Lifestyle = car.Lifestyle,
                        Awd = car.Awd,
                        High = car.High,
                        Convertible = car.Convertible,
                        Price = car.Price,
                        Cost = car.Cost,
                        Speed = car.Speed,
                        Mph = car.Mph,
                        Economy = car.Economy,
                        Alt_1 = car.Alt1,
                        Alt_2 = car.Alt2,
                        Alt_3 = car.Alt3,
                        Terms = car.Terms,
                        Finance = new Combobulator.Models.Finance
                        {
                            Info = car.Terms,
                            Term = finance.Term ?? 0,
                            Payment = finance.Payment ?? 0.0,
                            Price = finance.FinancePrice ?? 0.0,
                            Deposit = finance.Deposit ?? 0.0,
                            Contribution = finance.Contribution ?? 0.0,
                            Purchase_Fee = finance.PurchaseFee ?? 0.0,
                            Final_Payment = finance.FinalPayment ?? 0.0,
                            Credit_Charge = finance.CreditCharge ?? 0.0,
                            ROI = finance.ROI,
                            APR = finance.APR
                        }
                    });
                }

                if (viewModel == null)
                {
                    throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
                }

                var settings = new JsonSerializerSettings();
                settings.ContractResolver = new LowercaseContractResolver();
                var json = JsonConvert.SerializeObject(viewModel, Formatting.Indented, settings);

                StringContent sc = new StringContent(json);
                sc.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                response.Content = sc;

                if (apiCacheEnabled)
                {
                    response.Headers.CacheControl = new CacheControlHeaderValue();
                    response.Headers.CacheControl.MaxAge = new TimeSpan(apiCacheDurationHours, 0, 0);
                    response.Headers.CacheControl.Public = true;
                }
                return response;
            }
            catch (Exception ex)
            {
                log.Error("GetCars", ex);
                ErrorResponse error = new ErrorResponse
                {
                    Error = "Failed to get cars"
                };
                StringContent sc = new StringContent(serializer.Serialize(error).ToString());
                sc.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                response.Content = sc;
                return response;
            }
        }

        // GET api/car/XN12
        // Get single car by model code
        [DeflateCompression]
        [System.Web.Mvc.HttpGet]
        public HttpResponseMessage GetCar(string id)
        {
            var serializer = new JavaScriptSerializer();
            HttpResponseMessage response = new HttpResponseMessage();

            try
            {
                Car dbCar = dbContext.GetCar(id).FirstOrDefault();
                Models.Car car = new Models.Car
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

                if (car == null)
                {
                    throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
                }
                
                StringContent sc = new StringContent(serializer.Serialize(car).ToString());
                sc.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                response.Content = sc;

                if (apiCacheEnabled)
                {
                    response.Headers.CacheControl = new CacheControlHeaderValue();
                    response.Headers.CacheControl.MaxAge = new TimeSpan(apiCacheDurationHours, 0, 0);
                    response.Headers.CacheControl.Public = true;
                }
                return response;
            }
            catch (Exception ex)
            {
                log.Error("GetCar", ex);
                ErrorResponse error = new ErrorResponse
                {
                    Error = "Failed to get car"
                };
                StringContent sc = new StringContent(serializer.Serialize(error).ToString());
                sc.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                response.Content = sc;
                return response;
            }
        }
    }
}