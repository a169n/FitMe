import { Link, useNavigate } from "react-router-dom";
import { useAccess } from "../../hooks/useAccess";
import "./AdminPage.css";
import { Sidebar } from "../../components/AdminComponents/Sidebar";

export default function AdminPage() {
  useAccess();

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-content">
        <h1>Admin Page</h1>
      </div>
    </div>
  );
}
