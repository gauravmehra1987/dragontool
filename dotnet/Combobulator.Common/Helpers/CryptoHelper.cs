using System.Security.Cryptography;
using System.Text;

namespace Combobulator.Common.Helpers
{
    public static class CryptoHelper
    {
        public static string CalculateMd5Hash(string input)
        {
            var md5 = MD5.Create();
            var inputBytes = Encoding.ASCII.GetBytes(input);
            var hash = md5.ComputeHash(inputBytes);

            var sb = new StringBuilder();
            foreach (var t in hash)
            {
                sb.Append(t.ToString("x2"));
            }

            var s = sb.ToString();
            var checksum = s.Length > 10 ? s.Substring(s.Length - 10, 10) : sb.ToString();
            return checksum;
        }


    }
}
