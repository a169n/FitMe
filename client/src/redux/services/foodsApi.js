import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const foodsApi = createApi({
  reducerPath: "foodsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getFoods: builder.query({
      query: () => ({
        url: "/foods",
      }),
      providesTags: ["Foods"],
    }),
    getFoodById: builder.query({
      query: (id) => ({
        url: `/food/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Foods", id }],
    }),
    createNewFood: builder.mutation({
      query: (newRestaurant) => ({
        url: "/food",
        method: "POST",
        body: newRestaurant,
      }),
      invalidatesTags: ["Foods"],
    }),
    updateFoodById: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `/food/${id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Foods", id }],
    }),
    deleteFoodById: builder.mutation({
      query: (id) => ({
        url: `/food/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Foods"],
    }),
  }),
});

export const {
  // GET /foods
  useGetFoodsQuery,
  useLazyGetFoodsQuery,
  // GET /restaurants/:id
  useGetFoodByIdQuery,
  // POST /restaurant
  useCreateNewFoodMutation,
  // PUT /restaurant/:id
  useUpdateFoodByIdMutation,
  // DELETE /restaurant/:id
  useDeleteFoodByIdMutation,
} = foodsApi;