import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import RestaurantPage from "./components/Restaurant/RestaurantPage";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/restaurant/:restaurantId"
            element={<RestaurantPage />}
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
