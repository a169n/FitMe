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
    getAllAdmins: builder.query({
      query: () => ({
        url: "/user/admins",
      }),
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
      query: ({ id, token }) => ({
        url: `/user/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
    changeItemAmountByOne: builder.mutation({
      query: ({ token, productId, increase }) => ({
        url: "/cart/amount",
        method: "PUT",
        body: { productId, increase },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["User", "Cart"],
    }),
    removeItemFromCart: builder.mutation({
      query: ({ token, productId }) => ({
        url: "/cart/remove",
        method: "DELETE",
        body: { productId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["User", "Cart"],
    }),
    getItemsNumberInCart: builder.query({
      query: (token) => ({
        url: "/cart/amount",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["User", "Cart"],
    }),
    clearCart: builder.mutation({
      query: (token) => ({
        url: "/cart/clear",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["User", "Cart"],
    }),
  }),
});

export const {
  // GET /users
  useGetUsersQuery,
  useLazyGetUsersQuery,
  // GET /user/admins
  useGetAllAdminsQuery,
  useLazyGetAllAdminsQuery,
  // GET /user/:id/details
  useGetUserDetailsQuery,
  useLazyGetUserDetailsQuery,
  // GET /user/:id
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
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
  // GET /user/cart/amount
  useGetItemsNumberInCartQuery,
  useLazyGetItemsNumberInCartQuery,
  // POST /cart/add
  useAddItemToCartMutation,
  // PUT /cart/amount
  useChangeItemAmountByOneMutation,
  // POST /cart/remove
  useRemoveItemFromCartMutation,
  // DELETE /cart/clear
  useClearCartMutation,
} = usersApi;
