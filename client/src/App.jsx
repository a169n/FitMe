import "./App.css";
import Main from "./components/Main/Main";
import Navbar from "./components/Navbar/Navbar";
import Restaurants from "./components/Restaurants/Restaurants";
import Search from "./components/Search/Search";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Main />
      <Restaurants />
      <Search />
    </>
  );
}

export default App;
