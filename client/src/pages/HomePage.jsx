import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Categories from "../components/Categories/Categories";
import Main from "../components/Main/Main";
import Restaurants from "../components/Restaurants/Restaurants";
import Search from "../components/Search/Search";
import { useUser } from "../hooks/useUser";
import { useSendLoginEmailMutation } from "../redux/services/mailApi";
import { useAdmin } from "../hooks/useAdmin";
import { useAccess } from "../hooks/useAccess";

export default function HomePage() {
  const navigate = useNavigate();
  const user = useUser();
  useAdmin()
  const [sendLoginEmail] = useSendLoginEmailMutation();

  // useEffect(() => {
  //   if (user) {
  //     console.log("User email:", user.email)
  //     sendLoginEmail(user.email);
  //   }
  // }, [user, sendLoginEmail]);

  

  return (
    <>
      <Main />
      <Restaurants />
      <Search />
      <Categories />
    </>
  );
}
