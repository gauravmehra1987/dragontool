using System;
using System.Data.Linq;
using System.Linq;
using System.Linq.Expressions;
using Combobulator.Business.Interfaces;

namespace Combobulator.Business.Repositories
{
    public class GenericRepository<T> : IRepository<T> where T : class, Models.IEntity
    {
        protected Table<T> DataTable;

        public GenericRepository(DataContext dataContext)
        {
            DataTable = dataContext.GetTable<T>();
        }

        public void Insert(T entity)
        {
            DataTable.InsertOnSubmit(entity);
        }

        public void Delete(T entity)
        {
            DataTable.DeleteOnSubmit(entity);
        }

        public IQueryable<T> SearchFor(Expression<Func<T, bool>> predicate)
        {
            return DataTable.Where(predicate);
        }

        public IQueryable<T> GetAll()
        {
            return DataTable;
        }

        public T GetById(int id)
        {
            return DataTable.Single(e => e.Id.Equals(id));
        }
    }
}
