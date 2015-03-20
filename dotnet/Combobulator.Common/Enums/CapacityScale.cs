using System.ComponentModel;

namespace Combobulator.Common.Enums
{
    public enum CapacityScale
    {
        [Description("1-2 people")]
        CapacityScale1 = 1,
        [Description("1-4 people (including car seat)")]
        CapacityScale2 = 2,
        [Description("1-2 adults + 1-2 children/1 adult + 3 children")]
        CapacityScale3 = 3,
        [Description("5 people")]
        CapacityScale4 = 4
    }
}
