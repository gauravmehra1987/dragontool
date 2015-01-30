using System;
using System.Collections.Generic;
using System.Data.Linq.Mapping;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Data.Linq;

namespace Combobulator.DAL
{
    public partial class CombobulatorDataContext
    {
        [FunctionAttribute(Name = "dbo.GetLookups")]
        [ResultType(typeof(Title))]
        [ResultType(typeof(Dealer))]
        public IMultipleResults GetLookupsResults()
        {
            IExecuteResult result = this.ExecuteMethodCall(this, ((MethodInfo)(MethodInfo.GetCurrentMethod())));
            return (IMultipleResults)(result.ReturnValue);
        }
    }
}
