using System.Web.Http;
using System.Reflection;
using log4net;

namespace Combobulator.ApiControllers
{
    public class BaseController : ApiController
    {
        public static readonly ILog Log = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
    }
}