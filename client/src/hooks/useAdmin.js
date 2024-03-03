import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAdmin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && !user.isAdmin) {
      navigate("/");
    } else if (user && user.isAdmin) {
      navigate("/admin");
    }
  }, [navigate]);
};
