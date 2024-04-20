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
import { Restaurants } from "./components/AdminComponents/Restaurants"
import { Orders } from "./components/AdminComponents/Orders";
import { Dishes } from "./components/AdminComponents/Dishes";
import { Users } from "./components/AdminComponents/Users";
import { Categories } from "./components/AdminComponents/Categories";
import { GlobalCategories } from "./components/AdminComponents/GlobalCategories";

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
          <Route path="/admin/restaurants" element={<Restaurants />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/dishes" element={<Dishes />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/categories" element={<Categories />} />
          <Route
            path="/admin/global-categories"
            element={<GlobalCategories />}
          />
        </Routes>
      </RouteWrapper>
    </Router>
  );
}

export default App;
