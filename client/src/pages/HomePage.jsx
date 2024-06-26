import GlobalCategories from "../components/GlobalCategories/GlobalCategories";
import Categories from "../components/GlobalCategories/GlobalCategories";
import Main from "../components/Main/Main";
import Restaurants from "../components/MainItems/MainItems";
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
