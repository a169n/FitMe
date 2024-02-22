import Categories from "./Categories/Categories";
import Main from "./Main/Main";
import Restaurants from "./Restaurants/Restaurants";
import Search from "./Search/Search";

export default function HomePage() {
  return (
    <>
      <Main />
      <Restaurants />
      <Search />
      <Categories />
    </>
  );
}
