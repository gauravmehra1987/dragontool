using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Combobulator.Models;

namespace Combobulator.Business.Interfaces
{
    public interface IProvider
    {
        bool SendData(Customer customer, out string requestUrl);
    }
}
