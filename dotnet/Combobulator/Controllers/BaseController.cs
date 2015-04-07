using System.Web.Mvc;
using System.Reflection;
using log4net;

namespace Combobulator.Controllers
{
    public class BaseController : Controller
    {
        public static readonly ILog Log = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
    }
}