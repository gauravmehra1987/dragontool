using Combobulator.Business.Interfaces;
using Combobulator.Models;

namespace Combobulator.Business.Services.Providers
{
    public class GrassRootsProvider : IProvider
    {
        public bool SendData(Customer customer)
        {
            return true;
        }
    }
}
