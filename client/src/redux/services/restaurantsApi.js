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
        url: "/restaurants",
        method: "POST",
        headers: {
          Authorization: `Bearer ${newRestaurant.token}`,
        },
        body: newRestaurant,
      }),
      invalidatesTags: ["Restaurants"],
    }),
    updateRestaurantById: builder.mutation({
      query: (formData) => ({
        url: `/restaurant/${formData.get("id")}`,
        method: "PUT",
        body: formData,
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
    addImageToRestaurant: builder.mutation({
      query: ({ id, image }) => ({
        url: `/restaurant/${id}/add-image`,
        method: "PUT",
        body: image,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Restaurants", id }],
    }),
  }),
});

export const {
  useGetRestaurantsQuery,
  useLazyGetRestaurantsQuery,
  useGetRestaurantByIdQuery,
  useSearchRestaurantsQuery,
  useLazySearchRestaurantsQuery,
  useCreateNewRestaurantMutation,
  useUpdateRestaurantByIdMutation,
  useDeleteRestaurantByIdMutation,
  useAddImageToRestaurantMutation,
} = restaurantsApi;
