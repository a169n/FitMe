import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAdmin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
    } else if (!user.isAdmin) {
      alert("Only admins can visit this page!")
      navigate("/")
    }
  }, [navigate]);
};
