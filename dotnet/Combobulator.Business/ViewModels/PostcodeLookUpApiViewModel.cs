using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Combobulator.Models;

namespace Combobulator.Business.ViewModels
{
    public class PostcodeLookUpApiViewModel
    {
        public List<PostcodeLookUp> Addresses { get; set; }
        public string ErrorMessage { get; set; }
        public string ResponseCode { get; set; }
    }
}
