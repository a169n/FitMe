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
    getFoodsByCategoryId: builder.query({
      query: (categoryId) => ({
        url: `/foods/category/${categoryId}`,
      }),
      providesTags: (result, error, categoryId) => [
        { type: "FoodsByCategory", categoryId },
      ],
    }),
    searchFoods: builder.query({
      query: ({ searchString, page, limit }) => ({
        url: "/foods/search",
        params: { searchString, page, limit },
      }),
      providesTags: ["Foods"],
    }),
    createNewFood: builder.mutation({
      query: (newFood) => {
        return {
          url: "/food",
          method: "POST",
          body: newFood,
        };
      },
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
  // GET /food/:id
  useGetFoodByIdQuery,
  useLazyGetFoodByIdQuery,
  // GET /foods/category/:categoryId
  useGetFoodsByCategoryIdQuery,
  useLazyGetFoodsByCategoryIdQuery,
  // GET /foods/search
  useSearchFoodsQuery,
  useLazySearchFoodsQuery,
  // POST /food
  useCreateNewFoodMutation,
  // PUT /restaurant/:id
  useUpdateFoodByIdMutation,
  // DELETE /restaurant/:id
  useDeleteFoodByIdMutation,
} = foodsApi;
