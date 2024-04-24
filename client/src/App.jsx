import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
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
import AdminRestaurants from "./components/AdminComponents/Restaurants/AdminRestaurants";
import { AdminOrders } from "./components/AdminComponents/Orders/AdminOrders";
import { AdminDishes } from "./components/AdminComponents/Dishes/AdminDishes";
import AdminCategories from "./components/AdminComponents/Categories/AdminCategories";
import { AdminGlobalCategories } from "./components/AdminComponents/GlobalCategories/AdminGlobalCategories";
import AdminUsers from "./components/AdminComponents/Users/AdminUsers";

const RouteWrapper = ({ children }) => {
  const location = useLocation();
  const hideNavbarFooterRoutes = [
    "/login",
    "/register",
    "/admin",
    "/admin/restaurants",
    "/admin/dishes",
    "/admin/users",
    "/admin/orders",
    "/admin/categories",
    "/admin/global-categories",
  ];

  const shouldHideNavbarFooter = () => {
    return hideNavbarFooterRoutes.includes(location.pathname);
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
          <Route
            path="/restaurants/search"
            element={<RestaurantSearchPage />}
          />
          <Route path="/dishes/search" element={<DishSearchPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/socket" element={<MessagePage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/admin/restaurants" element={<AdminRestaurants />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/dishes" element={<AdminDishes />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route
            path="/admin/global-categories"
            element={<AdminGlobalCategories />}
          />
        </Routes>
      </RouteWrapper>
    </Router>
  );
}

export default App;
