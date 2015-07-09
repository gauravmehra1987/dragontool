using System.Data.Linq;
using Combobulator.Business.Interfaces;
using Combobulator.Models;

namespace Combobulator.Business.Repositories
{
    public class CarRepository : GenericRepository<Car>, ICarRepository
    {
        public CarRepository(DataContext dataContext) : base(dataContext)
        {
        }
    }
}
