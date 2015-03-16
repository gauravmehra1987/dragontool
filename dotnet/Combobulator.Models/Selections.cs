namespace Combobulator.Models
{
    public class Selections
    {
        public string Capacity { get; set; }
        public string Luggage { get; set; }
        public Options Options { get; set; }
        public string PriceRange { get; set; }
        public string Performance { get; set; }
        public string Economy { get; set; }
        public string Use { get; set; }
    }

    public class Options
    {
        public string AWD { get; set; }
        public string DT { get; set; }
        public string HP { get; set; }
        public string TP { get; set; }
    }
}