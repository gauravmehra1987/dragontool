using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;

namespace Combobulator.ApiControllers
{
    public class AssetsController : BaseController
    {
        // GET api/assets/svg
        // GET api/assets/png
        /// <summary>
        /// Interrogates the local directory and returns a list of media files in JSON format.
        /// </summary>
        /// <param name="id">SVG/PNG</param>
        /// <returns>A list of media assets.</returns>
        [System.Web.Mvc.HttpGet]
        public HttpResponseMessage Get(string id)
        {
            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            HttpResponseMessage response = new HttpResponseMessage();
            IEnumerable<string> files = null;

            try
            {
                if (id == "svg")
                {
                    files = Directory.EnumerateFiles(HttpContext.Current.Server.MapPath("~/assets/sprites/svg/"), "*.svg", SearchOption.AllDirectories).Select(Path.GetFileName).ToList();
                    files = files.Select(x => ("assets/sprites/svg/" + x));
                }

                if (id == "png")
                {
                    files = Directory.EnumerateFiles(HttpContext.Current.Server.MapPath("~/assets/sprites/"), "*.png", SearchOption.AllDirectories).Select(Path.GetFileName).ToList();
                    files = files.Select(x => ("assets/sprites/" + x));
                }

                StringContent sc = new StringContent(serializer.Serialize(files));
                sc.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                response.Content = sc;

                return response;
            }
            catch (Exception ex)
            {
                Log.Error("api/assets", ex);

                StringContent sc = new StringContent(serializer.Serialize(files));
                sc.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                response.Content = sc;
                return response;
            }
        }
    }
}
