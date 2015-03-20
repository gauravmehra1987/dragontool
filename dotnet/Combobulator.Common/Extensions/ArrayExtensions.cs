using System;

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
                var isParsed = Int32.TryParse(i, out result);
                if (!isParsed)
                    continue;
                if (Convert.ToInt32(i) == search)
                {
                    counter++;
                }
            }
            var count = total - counter;
            return count;
        }
    }
}
