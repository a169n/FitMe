import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/users",
      }),
    }),
    addItemToCart: builder.mutation({
      query: ({ token, ...productData }) => ({
        url: "/cart/add",
        method: "POST",
        body: productData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["User", "Cart"],
    }),
    removeItemFromCart: builder.mutation({
      query: ({ token, productId }) => ({
        url: "/cart/remove",
        method: "POST",
        body: { productId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Cart"],
    }),
    getItemsNumberInCart: builder.query({
      query: (token) => ({
        url: "/cart/amount",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Cart"],
    }),
    getUserDetails: builder.query({
      query: (userId) => ({
        url: `/user/${userId}/details`,
      }),
      providesTags: ["User"],
    }),
    postGetUserProfile: builder.mutation({
      query: ({ reqUserId }) => ({
        url: "/user/profile",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { reqUserId },
      }),
      invalidatesTags: ["User"],
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
      }),
    }),
    getUserEmailByUsername: builder.query({
      query: (username) => ({
        url: "/user/email",
        method: "POST",
        body: { username },
      }),
    }),
    createUser: builder.mutation({
      query: (newUser) => ({
        url: "/user",
        method: "POST",
        body: newUser,
      }),
    }),
    updateUserById: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `/user/${id}`,
        method: "PUT",
        body: updates,
      }),
    }),
    deleteUserById: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
    }),
    searchUsers: builder.query({
      query: (searchString) => ({
        url: "/users/search",
        params: { searchString },
      }),
    }),
    makeUserAdminById: builder.mutation({
      query: (id) => ({
        url: `/user/${id}/make-admin`,
        method: "PUT",
      }),
    }),
    removeUserAdminById: builder.mutation({
      query: (id) => ({
        url: `/user/${id}/remove-admin`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  // GET /users
  useGetUsersQuery,
  useLazyGetUsersQuery,
  // GET /user/cart/amount
  useGetItemsNumberInCartQuery,
  useLazyGetItemsNumberInCartQuery,
  // GET /user/:id/details
  useGetUserDetailsQuery,
  useLazyGetUserDetailsQuery,
  // GET /user/:id
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  // POST /cart/add
  useAddItemToCartMutation,
  // POST /cart/remove
  useRemoveItemFromCartMutation,
  // GET /user/email
  useGetUserEmailByUsernameQuery,
  useLazyGetUserEmailByUsernameQuery,
  // POST /user
  useCreateUserMutation,
  // PUT /user/:id
  useUpdateUserByIdMutation,
  // DELETE /user/:id
  useDeleteUserByIdMutation,
  // GET /users/search
  useSearchUsersQuery,
  useLazySearchUsersQuery,
  // PUT /user/:id/make-admin
  useMakeUserAdminByIdMutation,
  // PUT /user/:id/remove-admin
  useRemoveUserAdminByIdMutation,
} = usersApi;
