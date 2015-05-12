using System.ComponentModel.DataAnnotations;

namespace Combobulator.Common.Enums
{
    public enum Salutation
    {
        [Display(Name ="Mr")]
        Mr = 1,
        [Display(Name ="Ms")]
        Ms = 2,
        [Display(Name = "Mrs")]
        Mrs = 3,
        [Display(Name = "Miss")]
        Miss = 4,
        [Display(Name = "Dr")]
        Dr = 5
    }
}
