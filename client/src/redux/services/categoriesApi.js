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
      providesTags: (result, error, id) => [{ type: "Category", id }],
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
      invalidatesTags: (result, error, { id }) => [{ type: "Category", id }],
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
  // GET /category/:id
  useGetCategoryByIdQuery,
  // POST /category
  useCreateNewCategoryMutation,
  // PUT /category/:id
  useUpdateCategoryByIdMutation,
  // DELETE /restaurant/:id
  useDeleteCategoryByIdMutation,
} = categoriesApi;
