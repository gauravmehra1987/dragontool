using System.Collections.Generic;
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
