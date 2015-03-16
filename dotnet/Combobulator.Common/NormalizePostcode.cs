using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Combobulator.Common
{
    public static class StringExtensions
    {
        public static string NormalizePostcode(this string postcode)
        {
            string temp_postcode = string.Empty;
            //removes end and start spaces 
            postcode = postcode.Trim();
            //removes in middle spaces 
            postcode = postcode.Replace(" ", "");

            switch (postcode.Length)
            {
                //add space after 2 characters if length is 5 
                case 5:
                    postcode = postcode.Insert(2, " ");
                    break;
                //add space after 3 characters if length is 6 
                case 6:
                    postcode = postcode.Insert(3, " ");
                    break;
                //add space after 4 characters if length is 7 
                case 7:
                    postcode = postcode.Insert(4, " ");
                    break;
                default: break;
            }
            return postcode;
        }
    }
}
