using System.Collections.Generic;
using Combobulator.Models;
using Combobulator.Helpers;
using Combobulator.Classes;

namespace Combobulator.ApiControllers
{
    public class CustomerController : BaseController
    {
        /// <summary>
        /// Connects to eMaster API and returns a list of users.
        /// </summary>
        /// <returns>Returns a list of users.</returns>
        [DeflateCompression]
        public List<User> Get()
        {
            var customers = Utils.GetCustomers();
            return customers;
        }
    }
}