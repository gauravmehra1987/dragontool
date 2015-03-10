using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Combobulator.Models;
using Combobulator.Common;
using Combobulator.Business.ViewModels;
using Combobulator.Common.Extensions;
using Newtonsoft.Json;
using Combobulator.Helpers;
using Combobulator.Classes;

namespace Combobulator.ApiControllers
{
    public class CustomerController : BaseController
    {
        [DeflateCompression]
        public List<Customer> Get()
        {
            var customers = Utils.GetCustomers();
            return customers;
        }
    }
}