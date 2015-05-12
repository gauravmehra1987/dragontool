using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Combobulator.Common.Enums
{
    public enum Colour
    {
        [Display(Name = "#f7941d")]
        [Description("Volcanic Orange")]
        VolcanicOrange = 1,
        [Display(Name = "#30b6e8")]
        [Description("Electric Blue")]
        ElectricBlue = 2,
        [Display(Name = "#1164ac")]
        [Description("Lightning Blue")]
        LightningBlue = 3,
        [Display(Name = "#426046")]
        [Description("Jungle Green")]
        JungleGreen = 4,
        [Display(Name = "#c10000")]
        [Description("Blazing Red")]
        BlazingRed = 5,
        [Display(Name = "#d71d24")]
        [Description("Chili Red")]
        ChiliRed = 6,
        [Display(Name = "#e4dfce")]
        [Description("Pepper White")]
        PepperWhite = 7,
        [Display(Name = "#e4dfce")]
        [Description("Light White")]
        LightWhite = 8
    }
}
