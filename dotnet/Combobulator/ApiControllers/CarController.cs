using System;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web.Script.Serialization;
using Combobulator.Data;
using Combobulator.Helpers;
using Combobulator.Models;
using Combobulator.Business.ViewModels;
using Newtonsoft.Json;

namespace Combobulator.ApiControllers
{
    public class CarController : BaseController
    {
        
        private readonly CombobulatorDataContext _dbContext = new CombobulatorDataContext();

        /// <summary>
        /// Interrogates a local database and returns a list of cars.
        /// </summary>
        /// <returns>A list of cars in JSON format.</returns>
        [DeflateCompression]
        [System.Web.Mvc.HttpGet]
        public HttpResponseMessage GetCars()
        {
            var serializer = new JavaScriptSerializer();
            var response = new HttpResponseMessage();
            try
            {
                var dbCar = _dbContext.GetCars().ToList();
                var viewModel = (from car in dbCar
                    let finance = _dbContext.GetCarFinance(car.Id).First()
                    select new CarViewModel
                    {
                        Brand = car.Brand,
                        Code = car.Code,
                        Color = car.Color,
                        Engine = car.Engine,
                        Name = car.Name,
                        Engine_Name = car.EngineName,
                        Model = car.Model,
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
                        Joke = car.Joke,
                        Url = car.Url,
                        Finance = new Models.Finance
                        {
                            Info = finance.Info,
                            Term = finance.Term ?? 0,
                            Payment = finance.Payment ?? 0.0,
                            Price = finance.FinancePrice ?? 0.0,
                            Deposit = finance.Deposit ?? 0.0,
                            Contribution = finance.Contribution ?? 0.0,
                            Purchase_Fee = finance.PurchaseFee ?? 0.0,
                            Final_Payment = finance.FinalPayment ?? 0.0,
                            Credit_Charge = finance.CreditCharge ?? 0.0,
                            ROI = finance.ROI,
                            APR = finance.APR,
                            Total_Amount = finance.TotalAmount ?? 0.0,
                            Total_Deposit = finance.TotalDeposit ?? 0.0,
                            Dealer_Discount = finance.DealerDiscount ?? 0.0
                        }
                    }).ToList();

                //Add Rocket Car
                viewModel.Add(new CarViewModel
                {
                    Brand = Common.Config.Brand,
                    Engine = "",
                    Engine_Name = "",
                    Model = "",
                    Capacity = "",
                    Luggage = "",
                    Lifestyle = "",
                    Alt_1 = "SX92",
                    Alt_2 = "MR92",
                    Alt_3 = "SS92",
                    Code = "RKT",
                    Color = "Blazing Red",
                    Name = "ALPHA CENTURA",
                    Terms = "",
                    Joke = "",
                    Url = ""
                });

                var settings = new JsonSerializerSettings {ContractResolver = new LowercaseContractResolver()};
                var json = JsonConvert.SerializeObject(viewModel, Formatting.Indented, settings);

                var sc = new StringContent(json);
                sc.Headers.ContentType = new MediaTypeHeaderValue("application/json");

                response.Content = sc;

                var response2 = new HttpResponseMessage()
                {
                    Content = new StringContent(
                        json,
                        Encoding.UTF8,
                        "application/json"
                        )
                };

                var cacheEnabled = bool.Parse(Common.Config.CacheEnabled);
                var expiryTimeOut = Int32.Parse(Common.Config.CacheExpiration);

                if (!cacheEnabled)
                    return response2;
                response.Headers.CacheControl = new CacheControlHeaderValue
                {
                    MaxAge = new TimeSpan(expiryTimeOut, 0, 0),
                    Public = true
                };

                return response;
            }
            catch (Exception ex)
            {
                Log.Error("GetCars", ex);
                var error = new ErrorResponse
                {
                    Error = "Failed to get cars"
                };
                var sc = new StringContent(serializer.Serialize(error));
                sc.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                response.Content = sc;
                return response;
            }
        }

        /*
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
                Car dbCar = dbContext.GetNewCar(id).FirstOrDefault();
                var car = new Models.NewCar
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
                    Alt_1 = dbCar.Alt1,
                    Alt_2 = dbCar.Alt2,
                    Alt_3 = dbCar.Alt3,
                    TermsConditions = dbCar.Terms
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
        */
    }
}