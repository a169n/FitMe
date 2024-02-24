import Categories from "./Categories/Categories";
import Main from "./Main/Main";
import Restaurants from "./Restaurants/Restaurants";
import Search from "./Search/Search";
import { useUser } from "../hooks/useUser";

export default function HomePage() {
  const user = useUser();
  console.log(user)
  return (
    <>
      <Main />
      <Restaurants />
      <Search />
      <Categories />
    </>
  );
}
