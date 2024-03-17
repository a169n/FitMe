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
import SearchPage from "./pages/SearchPage/SearchPage";
import CreatePage from "./pages/CreatePage/CreatePage";
import UpdatePage from "./pages/UpdatePage/UpdatePage";
import DeletePage from "./pages/DeletePage/DeletePage";
import ApiPage from "./pages/ApiPage/ApiPage";
import MessagePage from "./pages/MessagePage/MessagePage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";

const RouteWrapper = ({ children }) => {
  const navigate = useNavigate();

  const hideNavbarFooterRoutes = [
    "/login",
    "/register",
    "/admin",
    "/admin/create",
    "/admin/update",
    "/admin/delete",
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
          <Route path="/api" element={<ApiPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/create" element={<CreatePage />} />
          <Route path="/admin/update" element={<UpdatePage />} />
          <Route path="/admin/delete" element={<DeletePage />} />
          <Route path="/socket" element={<MessagePage />} />
          <Route path="/profile" element={<UserProfilePage />} />
        </Routes>
      </RouteWrapper>
    </Router>
  );
}

export default App;
