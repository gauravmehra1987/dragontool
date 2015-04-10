using System.ComponentModel;

namespace Combobulator.Common.Enums
{
    public enum PerformanceScale
    {
        [Description("105-120mph (nippy)")]
        PerformanceScale1 = 1,
        [Description("121-130 (nippier)")]
        PerformanceScale2 = 2,
        [Description("131-140 (quick)")]
        PerformanceScale3 = 3,
        [Description("141-145 + (woohooo)")]
        PerformanceScale4 = 4,
        [Description("Light Speed (presents 'Rocket car')")]
        PerformanceScale5 = 5
    }
}
