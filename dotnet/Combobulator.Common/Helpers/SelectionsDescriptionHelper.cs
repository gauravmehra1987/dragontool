using System;
using System.ComponentModel;

namespace Combobulator.Common.Helpers
{
    public static class SelectionsDescriptionHelper
    {
        public static string SelectionName(string id, string stype)
        {
            var description = string.Empty;
            switch (stype)
            {
                case "CapacityScale":
                    var selection1 = (Enums.CapacityScale)(Convert.ToInt32(id));
                    var type1 = typeof(Enums.CapacityScale);
                    var member1 = type1.GetMember(selection1.ToString());
                    var attributes1 = member1[0].GetCustomAttributes(typeof(DescriptionAttribute), false);
                    description = ((DescriptionAttribute)attributes1[0]).Description;
                    break;
                case "EconomyScale":
                    var selection2 = (Enums.EconomyScale)(Convert.ToInt32(id));
                    var type2 = typeof(Enums.EconomyScale);
                    var member2 = type2.GetMember(selection2.ToString());
                    var attributes2 = member2[0].GetCustomAttributes(typeof(DescriptionAttribute), false);
                    description = ((DescriptionAttribute)attributes2[0]).Description;
                    break;
                case "LuggageLevel":
                    var selection3 = (Enums.LuggageLevel)(Convert.ToInt32(id));
                    var type3 = typeof(Enums.LuggageLevel);
                    var member3 = type3.GetMember(selection3.ToString());
                    var attributes3 = member3[0].GetCustomAttributes(typeof(DescriptionAttribute), false);
                    description = ((DescriptionAttribute)attributes3[0]).Description;
                    break;
                case "Options":
                    var selection4 = (Enums.Options)(Convert.ToInt32(id));
                    var type4 = typeof(Enums.Options);
                    var member4 = type4.GetMember(selection4.ToString());
                    var attributes4 = member4[0].GetCustomAttributes(typeof(DescriptionAttribute), false);
                    description = ((DescriptionAttribute)attributes4[0]).Description;
                    break;
                case "PerformanceScale":
                    var selection5 = (Enums.PerformanceScale)(Convert.ToInt32(id));
                    var type5 = typeof(Enums.PerformanceScale);
                    var member5 = type5.GetMember(selection5.ToString());
                    var attributes5 = member5[0].GetCustomAttributes(typeof(DescriptionAttribute), false);
                    description = ((DescriptionAttribute)attributes5[0]).Description;
                    break;
                case "PriceRange":
                    var selection6 = (Enums.PriceRange)(Convert.ToInt32(id));
                    var type6 = typeof(Enums.PriceRange);
                    var member6 = type6.GetMember(selection6.ToString());
                    var attributes6 = member6[0].GetCustomAttributes(typeof(DescriptionAttribute), false);
                    description = ((DescriptionAttribute)attributes6[0]).Description;
                    break;
                case "Use":
                    var selection7 = (Enums.Use)(Convert.ToInt32(id));
                    var type7 = typeof(Enums.Use);
                    var member7 = type7.GetMember(selection7.ToString());
                    var attributes7 = member7[0].GetCustomAttributes(typeof(DescriptionAttribute), false);
                    description = ((DescriptionAttribute)attributes7[0]).Description;
                    break;
            }
            return description;
        }
    }
}
