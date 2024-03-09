import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    getOrderById: builder.query({
      query: (orderId) => ({
        url: `/order/${orderId}`,
        method: "GET",
      }),
    }),
    createOrder: builder.mutation({
      query: ({ orderData }) => ({
        url: "/order",
        method: "POST",
        body: orderData,
      }),
    }),
  }),
});

export const {
  // GET /order/:id
  useGetOrderByIdQuery,
  useLazyGetOrderByIdQuery,
  // POST /order/create
  useCreateOrderMutation,
} = orderApi;
