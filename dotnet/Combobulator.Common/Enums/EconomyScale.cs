using System.ComponentModel;

namespace Combobulator.Common.Enums
{
    public enum EconomyScale
    {
        [Description("25-45 (min economic)")]
        EconomyScale1 = 1,
        [Description("46-60")]
        EconomyScale2 = 2,
        [Description("61-69")]
        EconomyScale3 = 3,
        [Description("70-80 + (max economic)")]
        EconomyScale4 = 4
    }
}
