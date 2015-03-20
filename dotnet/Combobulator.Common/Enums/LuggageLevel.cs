using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel;

namespace Combobulator.Common.Enums
{
    public enum LuggageLevel
    {
        [Description("Minimalist")]
        LuggageLevel1 = 1,
        [Description("Light packer")]
        LuggageLevel2 = 2,
        [Description("Lugger")]
        LuggageLevel3 = 3,
        [Description("Big loader")]
        LuggageLevel4 = 4
    }
}
