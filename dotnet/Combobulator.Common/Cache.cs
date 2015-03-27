﻿using System;
using System.Runtime.Caching;

namespace Combobulator.Common
{
    public static class Cache
    {
        public static void SaveToCache(string cacheKey, object savedItem, DateTimeOffset expiryTime)
        {
            var policy = new CacheItemPolicy { AbsoluteExpiration = expiryTime };
            MemoryCache.Default.Add(cacheKey, savedItem, policy);
        }

        public static T GetFromCache<T>(string cacheKey) where T : class
        {
            return MemoryCache.Default[cacheKey] as T;
        }

        public static void RemoveFromCache(string cacheKey)
        {
            MemoryCache.Default.Remove(cacheKey);
        }

        public static bool IsInCache(string cacheKey)
        {
            return MemoryCache.Default[cacheKey] != null;
        }
    }
}