import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const globalCategoriesApi = createApi({
  reducerPath: "globalCategoriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getGlobalCategories: builder.query({
      query: () => ({
        url: "/global/categories",
      }),
      providesTags: ["GlobalCategory"],
    }),
    getGlobalCategoryById: builder.query({
      query: (id) => ({
        url: `/global/categories/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "GlobalCategory", id }],
    }),
    createNewGlobalCategory: builder.mutation({
      query: (newCategory) => ({
        url: "/global/categories",
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: ["GlobalCategory"],
    }),
    updateGlobalCategoryById: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `/global/category/${id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "GlobalCategory", id },
      ],
    }),
    deleteGlobalCategoryById: builder.mutation({
      query: (id) => ({
        url: `/global/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["GlobalCategory"],
    }),
  }),
  tagTypes: ["GlobalCategory"],
});

export const {
  // GET /global/categories
  useGetGlobalCategoriesQuery,
  useLazyGetGlobalCategoriesQuery,
  // GET /global/categories/:id
  useGetGlobalCategoryByIdQuery,
  useLazyGetGlobalCategoryByIdQuery,
  // POST /global/category
  createNewGlobalCategory,
  // PUT /global/category/:id
  updateGlobalCategoryById,
  // DELETE /global/category/:id
  deleteGlobalCategoryById,
} = globalCategoriesApi;
