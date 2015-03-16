using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Combobulator.Common.Extensions
{
    public static class ArrayExtensions
    {
        public static int CountCharacterFrequency(this string[] array, int search)
        {
            var total = array.Length;
            var counter = 0;
            foreach (var i in array)
            {
                int result;
                bool isParsed = Int32.TryParse(i, out result);
                if (isParsed)
                {
                    if (Convert.ToInt32(i) == search)
                    {
                        counter++;
                    }
                }
            }
            var count = total - counter;
            return count;
        }
    }
}
