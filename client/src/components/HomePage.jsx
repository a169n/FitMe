import Categories from "./Categories/Categories";
import Main from "./Main/Main";
import Restaurants from "./Restaurants/Restaurants";
import Search from "./Search/Search";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useUserIsAdmin } from "../hooks/useUserIsAdmin";

export default function HomePage() {
  
  const navigate = useNavigate()
  const user = useUser();
  console.log(user)

  if (useUserIsAdmin()) {
    navigate("/admin")
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
