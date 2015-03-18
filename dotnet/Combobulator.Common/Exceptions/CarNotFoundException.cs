using System;
namespace Combobulator.Common.Exceptions
{
    public class CarNotFoundException : Exception
    {
        public CarNotFoundException()
        {
        }

        public CarNotFoundException(string message) : base(message)
        {
        }
    }
}
