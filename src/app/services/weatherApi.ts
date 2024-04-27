import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "../../utils";
import { BASE_URL } from "../../constants";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders,
  }),
  tagTypes: ['products'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ campaign }) => ({
        url: "products",
        method: "GET",
        params: { campaign }
      }),
      providesTags: ['products']
    }),
    addProduct: builder.mutation({
      query: (body) => ({
        url: "products/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const { useGetProductsQuery, useAddProductMutation } = productsApi;
