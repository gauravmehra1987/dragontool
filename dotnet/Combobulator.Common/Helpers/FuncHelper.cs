using System;
using System.Threading;

namespace Combobulator.Common.Helpers
{
    public static class FuncHelper
    {
        public static bool DoFuncWithRetry<T>(Func<T, bool> func, T entity, TimeSpan sleepPeriod, int retryCount = 3)
        {
            var success = false;
            while (true)
            {
                try
                {
                    success = func(entity);
                    break; // success
                }
                catch (Exception ex)
                {
                    if (--retryCount == 0)
                    {
                        break;
                    }
                    else
                    {
                        Thread.Sleep(sleepPeriod);
                    }
                }
            }
            return success;
        }
    }
}
