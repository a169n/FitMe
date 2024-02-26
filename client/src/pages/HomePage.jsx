import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserIsAdmin } from "../hooks/useUserIsAdmin";
import Categories from "../components/Categories/Categories";
import Main from "../components/Main/Main";
import Restaurants from "../components/Restaurants/Restaurants";
import Search from "../components/Search/Search";

export default function HomePage() {
  const navigate = useNavigate();
  const isAdmin = useUserIsAdmin();

  if (isAdmin) {
    navigate("/admin");
  }

  return (
    <>
      <Main />
      <Restaurants />
      <Search />
      <Categories />
    </>
  );
}
