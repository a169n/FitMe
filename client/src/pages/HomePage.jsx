import Categories from "../components/Categories/Categories";
import Main from "../components/Main/Main";
import Restaurants from "../components/Restaurants/Restaurants";
import Search from "../components/Search/Search";
import { useAccess } from "../hooks/useAccess";

export default function HomePage() {
  useAccess();

  return (
    <>
      <Main />
      <Restaurants />
      <Search />
      <Categories />
    </>
  );
}
