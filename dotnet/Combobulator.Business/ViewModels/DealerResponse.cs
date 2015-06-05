namespace Combobulator.Business.ViewModels
{
    public class DealerResponse
    {
        public string totalpages { get; set; }
        public string errormessage { get; set; }
        public string responsecode { get; set; }
        public string currentpage { get; set; }
        public dealer[] dealers { get; set; }
    }

    public class dealer
    {
        public string longitude { get; set; }
        public string distance { get; set; }
        public string dealerimage { get; set; }
        public string telephone { get; set; }
        public string address { get; set; }
        public string dealerid { get; set; }
        public string latitude { get; set; }
        public string name { get; set; }
        public string hours { get; set; }
    }
}
