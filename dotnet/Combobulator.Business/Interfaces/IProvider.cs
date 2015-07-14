using Combobulator.Models;

namespace Combobulator.Business.Interfaces
{
    public interface IProvider
    {
        bool SendData(Customer customer, out string requestUrl);
    }
}
