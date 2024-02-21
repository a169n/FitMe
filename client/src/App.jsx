import React from "react";
import Layout from "./components/Layout";
import Main from "./components/Main/Main";
import Restaurants from "./components/Restaurants/Restaurants";
import Search from "./components/Search/Search";
import Categories from "./components/Categories/Categories";

function App() {
  return (
    <Layout>
      <Main />
      <Restaurants />
      <Search />
      <Categories />
    </Layout>
  );
}

export default App;
