import { useEffect, useState } from "react";

export const useUserIsAdmin = () => {
  const [userIsAdmin, setUserIsAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.isAdmin) {
      setUserIsAdmin(true);
    } else {
      setUserIsAdmin(false);
    }
  }, []);

  return userIsAdmin;
};
