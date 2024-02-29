import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserIsAdmin } from "../hooks/useUserIsAdmin";
import Categories from "../components/Categories/Categories";
import Main from "../components/Main/Main";
import Restaurants from "../components/Restaurants/Restaurants";
import Search from "../components/Search/Search";
import { useUser } from "../hooks/useUser";
import { useSendLoginEmailMutation } from "../redux/services/mailApi";

export default function HomePage() {
  const navigate = useNavigate();
  const isAdmin = useUserIsAdmin();
  const user = useUser();
  const [sendLoginEmail] = useSendLoginEmailMutation();

  useEffect(() => {
    if (user) {
      console.log("User email:", user.email)
      sendLoginEmail(user.email);
    }
  }, [user, sendLoginEmail]);

  if (isAdmin) {
    navigate("/admin");
    return null;
  }

  return (
    <>
      <Main />
      <Restaurants />
      <Search />
      <Categories />
    </>
  );
}
