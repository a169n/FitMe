import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
      providedTags: ["Orders"],
    }),
    getOrderById: builder.query({
      query: (orderId) => ({
        url: `/order/${orderId}`,
        method: "GET",
      }),
      providedTags: ["Orders"],
    }),
    createOrder: builder.mutation({
      query: ({ token, ...orderData }) => ({
        url: "/order",
        method: "POST",
        body: orderData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Orders"],
    }),
    updateOrderById: builder.mutation({
      query: ({ orderId, ...orderData }) => ({
        url: `/order/${orderId}`,
        method: "PUT",
        body: orderData,
      }),
      invalidatesTags: ["Orders"],
    }),
    deleteOrderById: builder.mutation({
      query: (orderId) => ({
        url: `/order/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
    deleteAllOrders: builder.mutation({
      query: () => ({
        url: "/orders",
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
    rateOrder: builder.mutation({
      query: ({ orderId, rating, reviewText, token }) => ({
        url: `/rate/${orderId}`,
        method: "POST",
        body: { rating, reviewText },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
  tagTypes: ["Orders"],
});

export const {
  // GET /orders
  useGetOrdersQuery,
  // GET /order/:id
  useGetOrderByIdQuery,
  // POST /order
  useCreateOrderMutation,
  // PUT /order/:id
  useUpdateOrderByIdMutation,
  // DELETE /order/:id
  useDeleteOrderByIdMutation,
  // DELETE /orders
  useDeleteAllOrdersMutation,
  // POST /rate/:orderId
  useRateOrderMutation,
} = orderApi;
