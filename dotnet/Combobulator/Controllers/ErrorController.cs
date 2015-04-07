using System.Web.Mvc;
using Combobulator.Business.ViewModels;

namespace Combobulator.Controllers
{
    public class ErrorController : BaseController
    {
        public ActionResult Index(string error)
        {
            var viewModel = new ErrorViewModel
            {
                Title = "General Error",
                Description = "Sorry, an error occurred while processing your request.",
                Error = error
            };
            return View(viewModel);
        }

        public ActionResult HttpError404(string error)
        {
            var viewModel = new ErrorViewModel
            {
                Title = "Not Found (404)",
                Description = "Sorry, an error occurred while processing your request.",
                Error = error
            };
            return View(viewModel);
        }

        public ActionResult HttpError500(string error)
        {
            var viewModel = new ErrorViewModel
            {
                Title = "Exception Error (500)",
                Description = "Sorry, an error occurred while processing your request.",
                Error = error
            };
            return View(viewModel);
        }
    }
}
