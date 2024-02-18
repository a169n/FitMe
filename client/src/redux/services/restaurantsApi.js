import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const restaurantsApi = createApi({
  reducerPath: "restaurantsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getRestaurants: builder.query({
      query: () => ({
        url: "/restaurants",
      }),
      providesTags: ["Restaurants"],
    }),
    getRestaurantById: builder.query({
      query: (id) => ({
        url: `/restaurant/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Restaurants", id }],
    }),
    searchRestaurants: builder.query({
      query: (searchString) => ({
        url: "/restaurants/search",
        params: { searchString },
      }),
      providesTags: ["Restaurants"],
    }),
    createNewRestaurant: builder.mutation({
      query: (newRestaurant) => ({
        url: "/restaurant",
        method: "POST",
        body: newRestaurant,
      }),
      invalidatesTags: ["Restaurants"],
    }),
    updateRestaurantById: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `/restaurant/${id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Restaurants", id }],
    }),
    deleteRestaurantById: builder.mutation({
      query: (id) => ({
        url: `/restaurant/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Restaurants"],
    }),
  }),
});

export const {
  // GET /restaurants
  useGetRestaurantsQuery,
  useLazyGetRestaurantsQuery,
  // GET /restaurants/:id
  useGetRestaurantByIdQuery,
  // GET /restaurants/search
  useLazySearchRestaurantsQuery,
  // POST /restaurant
  useCreateNewRestaurantMutation,
  // PUT /restaurant/:id
  useUpdateRestaurantByIdMutation,
  // DELETE /restaurant/:id
  useDeleteRestaurantByIdMutation,
} = restaurantsApi;
