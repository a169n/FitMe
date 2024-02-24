import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./useUser"; // Import useUser hook

export const useAccess = () => {
  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {
    if (!user && location.pathname !== "/register") {
      navigate("/login");
    } else if (user && user.isAdmin) {
      navigate("/admin");
    }
  }, [navigate, user]);
};
