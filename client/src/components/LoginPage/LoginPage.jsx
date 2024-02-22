import { useEffect, useState } from "react";
import { useLoginMutation } from "../../redux/services/authApi";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: null,
    password: null,
  });

  console.log(credentials);
  const [login, { isSuccess: loginSuccess }] = useLoginMutation();

  useEffect(() => {
    if (loginSuccess) navigate("/");
  }, [loginSuccess, navigate]);

  return (
    <div>
      <h1>Enter your credentials</h1>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => {
          setCredentials((prev) => ({ ...prev, username: e.target.value }));
        }}
      />
      <input
        type="text"
        placeholder="Password"
        onChange={(e) => {
          setCredentials((prev) => ({ ...prev, password: e.target.value }));
        }}
      />
      <button onClick={() => login(credentials)}>Login</button>
      <Link className="link" to={"/register"}>
        <button>Do not have an account?</button>
      </Link>
    </div>
  );
};

export default LoginPage;
