using System.Web.Mvc;
using Combobulator.Business.ViewModels;

namespace Combobulator.Controllers
{
    public class ErrorController : BaseController
    {
        public ActionResult Index(string error)
        {
            Response.StatusCode = 400;
            var viewModel = new ErrorViewModel
            {
                Title = "General Error",
                Description = "Sorry, an error occurred while processing your request.",
                Error = error
            };
            Response.ContentType = "text/html";
            return View(viewModel);
        }

        public ActionResult NotFound(string error)
        {
            Response.StatusCode = 404;
            var viewModel = new ErrorViewModel
            {
                Title = "General Error",
                Description = "Sorry, an error occurred while processing your request.",
                Error = error
            };
            Response.ContentType = "text/html";
            return View(viewModel);
        }

        public ActionResult Http500(string error)
        {
            Response.StatusCode = 500;
            var viewModel = new ErrorViewModel
            {
                Title = "General Error",
                Description = "Sorry, an error occurred while processing your request.",
                Error = error
            };
            Response.ContentType = "text/html";
            return View(viewModel);
        }
    }
}
