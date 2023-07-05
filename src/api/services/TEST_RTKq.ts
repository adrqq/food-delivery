/* eslint-disable max-len */
// import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { ProductCategory } from '../../types/products';
import { ProductModel } from '../../models/ProductModel';

export const productsAPI = createApi({
  reducerPath: 'productsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
  }),
  endpoints: (builder) => ({
    getProductsChunk: builder.query<ProductModel[], { currentPage: number, itemsPerPage: number, selectedFilter: ProductCategory, searchQuery: string }>({
      query: ({
        currentPage,
        itemsPerPage,
        selectedFilter,
        searchQuery,
      }) => ({
        url: '/products',
        method: 'GET',
        params: {
          currentPage,
          itemsPerPage,
          selectedFilter,
          searchQuery,
        },
      }),
    }),
  }),
});
