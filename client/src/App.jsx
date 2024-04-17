import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import RestaurantPage from "./pages/RestaurantPage/RestaurantPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import RestaurantSearchPage from "./pages/SearchPages/RestaurantSearchPage";
import MessagePage from "./pages/MessagePage/MessagePage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import DishSearchPage from "./pages/SearchPages/DishSearchPage";

const RouteWrapper = ({ children }) => {
  const hideNavbarFooterRoutes = [
    "/login",
    "/register",
    "/admin",
  ];

  const shouldHideNavbarFooter = () => {
    return hideNavbarFooterRoutes.includes(window.location.pathname);
  };

  return (
    <>
      {!shouldHideNavbarFooter() && <Navbar />}
      {children}
      {!shouldHideNavbarFooter() && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <RouteWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/restaurant/:restaurantId"
            element={<RestaurantPage />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/restaurants/search" element={<RestaurantSearchPage />} />
          <Route path="/dishes/search" element={<DishSearchPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/socket" element={<MessagePage />} />
          <Route path="/profile" element={<UserProfilePage />} />
        </Routes>
      </RouteWrapper>
    </Router>
  );
}

export default App;
