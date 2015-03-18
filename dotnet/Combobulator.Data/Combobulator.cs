using System.Data.Linq;
using System.Data.Linq.Mapping;
using System.Reflection;

namespace Combobulator.Data
{
    public partial class CombobulatorDataContext
    {
        [Function(Name = "dbo.GetLookups")]
        [ResultType(typeof(Title))]
        public IMultipleResults GetLookupsResults()
        {
            IExecuteResult result = this.ExecuteMethodCall(this, ((MethodInfo)(MethodInfo.GetCurrentMethod())));
            return (IMultipleResults)(result.ReturnValue);
        }
    }
}
