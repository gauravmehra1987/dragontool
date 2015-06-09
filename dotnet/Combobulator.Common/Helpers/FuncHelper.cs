using System;
using System.Threading;

namespace Combobulator.Common.Helpers
{
    public static class FuncHelper
    {
        public delegate T3 ExternalApiFunction<in T1,T2, out T3>(T1 customer, out T2 url);
        public static bool DoFuncWithRetry<T>(ExternalApiFunction<T, string, bool> func, T entity, out string requestUrl, TimeSpan sleepPeriod, int retryCount = 3)
        {
            requestUrl = string.Empty;
            var success = false;
            while (true)
            {
                try
                {
                    success = func(entity, out requestUrl);

                    if (!success)
                    {
                        throw new Exception("Function did not return true");
                    }
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
