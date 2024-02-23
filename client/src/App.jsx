import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import RestaurantPage from "./components/RestaurantPage/RestaurantPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";

const RouteWrapper = ({ children }) => {
  const navigate = useNavigate();

  const hideNavbarFooterRoutes = ["/login", "/register"];

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
        </Routes>
      </RouteWrapper>
    </Router>
  );
}

export default App;
