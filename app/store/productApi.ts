import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {setCache, getCache} from '../utils/mmkv';
import type {Product} from '@typings/product';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://fakestoreapi.com'}),
  endpoints: builder => ({
    getProducts: builder.query<Product[], {page: number; category?: string}>({
      async queryFn({page, category}, _queryApi, _extraOptions, fetchWithBQ) {
        const cacheKey = `products_${category || 'all'}_page_${page}`;
        const cachedData = getCache<Product[]>(cacheKey);

        if (cachedData) {
          return {data: cachedData};
        }
        const endpoint =
          category && category !== 'all'
            ? `products/category/${category}?limit=${page * 10}`
            : `products?limit=${page * 10}`;
        const result = await fetchWithBQ(endpoint);

        if (result.error) {
          return {error: result.error};
        }

        const products = result.data as Product[];
        setCache(cacheKey, products);
        return {data: products};
      },
    }),
    getCategories: builder.query<string[], void>({
      query: () => 'products/categories',
    }),
  }),
});

export const {useGetProductsQuery, useGetCategoriesQuery} = productApi;
