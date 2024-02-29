import React, { useEffect, useState } from "react";
import { useLoginMutation } from "../../redux/services/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });

  const [login, { isSuccess: loginSuccess, isError: loginError }] =
    useLoginMutation();


  useEffect(() => {
    if (loginSuccess) {
      setMessage({ text: "Login successful. Redirecting...", type: "success" });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
    if (loginError) {
      setMessage({
        text: "Invalid username or password. Please try again.",
        type: "error",
      });
    }
  }, [loginSuccess, loginError, navigate]);

  const handleLogin = async () => {
    try {
      await login(credentials);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-title">Login</h1>

        <input
          type="text"
          placeholder="Username"
          className="login-input"
          value={credentials.username}
          onChange={(e) =>
            setCredentials((prev) => ({
              ...prev,
              username: e.target.value,
            }))
          }
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={credentials.password}
          onChange={(e) =>
            setCredentials((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
          required
        />
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
        <Link className="link" to={"/register"}>
          <button className="login-button">Do not have an account?</button>
        </Link>
        {message.text && (
          <div
            className={`message ${
              message.type === "error" ? "error-message" : "success-message"
            }`}
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
