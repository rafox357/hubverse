import { useQuery, QueryKey, UseQueryOptions } from '@tanstack/react-query';
import { CacheService } from '../services/cache';

export function useQueryWithCache<T>(
  queryKey: QueryKey,
  fetchFn: () => Promise<T>,
  options?: Omit<UseQueryOptions<T, Error, T>, 'queryKey' | 'queryFn'> & {
    cacheTime?: number;
    persistent?: boolean;
    onError?: (error: Error) => void;
  }
) {
  return useQuery<T, Error, T>({
    queryKey,
    queryFn: async () => {
      const cacheKey = typeof queryKey === 'string' 
        ? queryKey 
        : Array.isArray(queryKey) 
          ? queryKey.join('-') 
          : JSON.stringify(queryKey);
      
      const cached = CacheService.get(cacheKey);
      
      if (cached) {
        return cached as T;
      }

      const data = await fetchFn();
      CacheService.set(cacheKey, data, {
        expires: options?.cacheTime
      });
      
      return data;
    },
    staleTime: options?.staleTime,
    cacheTime: options?.cacheTime,
    ...options
  });
}