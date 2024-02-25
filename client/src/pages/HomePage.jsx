import Categories from "../components/Categories/Categories";
import Main from "../components/Main/Main";
import Restaurants from "../components/Restaurants/Restaurants";
import Search from "../components/Search/Search";
import { useNavigate } from "react-router-dom";
import { useUserIsAdmin } from "../hooks/useUserIsAdmin";

export default function HomePage() {
  const navigate = useNavigate();

  if (useUserIsAdmin()) {
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
