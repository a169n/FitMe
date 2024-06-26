import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: "/categories",
      }),
      providesTags: ["Category"],
    }),
    getCategoryById: builder.query({
      query: (id) => ({
        url: `/category/${id}`,
      }),
      providesTags: ["Category"],
    }),
    getCategoriesByRestaurantId: builder.query({
      query: (restaurantId) => ({
        url: `/categories/${restaurantId}`,
      }),
      providesTags: (result, error, restaurantId) => [
        { type: "Category", restaurantId },
      ],
    }),
    createNewCategory: builder.mutation({
      query: (newCategory) => ({
        url: "/category",
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategoryById: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `/category/${id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategoryById: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
  tagTypes: ["Category"],
});

export const {
  // GET /categories
  useGetCategoriesQuery,
  useLazyGetCategoriesQuery,
  // GET /categories/:restaurantId
  useGetCategoriesByRestaurantIdQuery,
  useLazyGetCategoriesByRestaurantIdQuery,
  // GET /category/:id
  useGetCategoryByIdQuery,
  // POST /category
  useCreateNewCategoryMutation,
  // PUT /category/:id
  useUpdateCategoryByIdMutation,
  // DELETE /restaurant/:id
  useDeleteCategoryByIdMutation,
} = categoriesApi;
