using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Combobulator.Models;
using System.Web.Mvc;
using System.Net.Http.Headers;
using System.Web.UI;
using System.Configuration;

namespace Combobulator.Controllers
{
    public class CarController : ApiController
    {
        private int apiCacheDurationHours = Convert.ToInt32(ConfigurationManager.AppSettings["ApiCacheDurationHours"]);
        private bool apiCacheEnabled = Convert.ToBoolean(ConfigurationManager.AppSettings["ApiCacheEnabled"]);
        private Combobulator.DAL.CombobulatorDataContext dbContext = new Combobulator.DAL.CombobulatorDataContext();
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        // GET api/car
        // Gets all cars
        [System.Web.Mvc.HttpGet]
        public HttpResponseMessage GetCars()
        {
            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            HttpResponseMessage response = new HttpResponseMessage();

            try
            {
                IList<Combobulator.DAL.Car> dbCar = dbContext.GetCars().ToList();
                var query = from c in dbCar
                            select new Car
                                {
                                    Id = c.Id,
                                    Model = c.Model,
                                    ModelCode = c.ModelCode,
                                    Colour = c.Colour,
                                    Engine = c.Engine,
                                    DisplayName = c.DisplayName,
                                    Type = c.Type,
                                    CapacityScale = c.CapacityScale,
                                    LuggageScale = c.LuggageScale,
                                    Options = c.Options,
                                    PriceScale = c.PriceScale,
                                    Cost = c.Cost,
                                    PerformanceScale = c.PerformanceScale,
                                    MPH = c.MPH,
                                    EconomyScale = c.EconomyScale,
                                    MPG = c.MPG,
                                    UsageScale = c.UsageScale,
                                    Alt1 = c.Alt1,
                                    Alt2 = c.Alt2,
                                    Alt3 = c.Alt3,
                                    TermsConditions = c.TermsConditions
                                };

                IEnumerable<Car> cars = query.ToList();

                if (cars == null)
                {
                    throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
                }

                StringContent sc = new StringContent(serializer.Serialize(cars).ToString());
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
        [System.Web.Mvc.HttpGet]
        public HttpResponseMessage GetCar(string id)
        {
            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            HttpResponseMessage response = new HttpResponseMessage();

            try
            {
                Combobulator.DAL.Car dbCar = dbContext.GetCar(id).FirstOrDefault();
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