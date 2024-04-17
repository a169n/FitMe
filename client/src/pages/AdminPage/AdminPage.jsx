import { Link, useNavigate } from "react-router-dom";
import { useAccess } from "../../hooks/useAccess";
import "./AdminPage.css";

export default function AdminPage() {
  useAccess();
  const navigate = useNavigate();

  const handleReturnToHomePage = () => {
    navigate("/");
  };

  return (
    <div className="adminPage global-padding">
      <h1 className="admin-page-heading">Admin Page</h1>
      <button className="return-button" onClick={handleReturnToHomePage}>
        Return to HomePage
      </button>
    </div>
  );
}
