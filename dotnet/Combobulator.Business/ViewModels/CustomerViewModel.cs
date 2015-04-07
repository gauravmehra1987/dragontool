namespace Combobulator.Business.ViewModels
{
    public class CustomerViewModel
    {
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string name { get; set; }
        public string surname { get; set; }
        public Fields Fields { get; set; }
        public string Car { get; set; }
        public Input Input { get; set; }
    }

    public class Fields
    {
        public string UserId { get; set; }
        public string Title { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Home { get; set; }
        public string Work { get; set; }
        public string Mobile { get; set; }
        public string Address_1 { get; set; }
        public string Address_2 { get; set; }
        public string Address_3 { get; set; }
        public string Postcode { get; set; }
        public string Dealer { get; set; }
        public string Callback { get; set; }
    }

    public class Input
    {
        public string[] Seats { get; set; }
        public string Lifestyle { get; set; }
        public string Speed { get; set; }
        public string Mpg { get; set; }
        public string Luggage { get; set; }
        public Options Options { get; set; }
        public string Price { get; set; }
    }

    public class Options
    {
        public string awd {get;set;}
        public string hp {get;set;}
        public string dt {get;set;}
        public string tp { get; set; }
    }
}
