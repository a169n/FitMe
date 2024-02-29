import { useState } from "react";
import { useRegisterMutation } from "../../redux/services/authApi";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import { useSendRegisterEmailMutation } from "../../redux/services/mailApi";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
    age: 0,
    isMale: false,
  });

  const [register] = useRegisterMutation();
  const [sendRegisterEmail] = useSendRegisterEmailMutation();


  const handleRegister = async () => {
    if (
      !credentials.username ||
      !credentials.password ||
      !credentials.email ||
      credentials.age === 0
    ) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      await register(credentials);
      setSuccessMessage("Registration successful. Redirecting...");
      await sendRegisterEmail(credentials.email);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1 className="register-title">Register</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) =>
              setCredentials((prev) => ({ ...prev, username: e.target.value }))
            }
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setCredentials((prev) => ({ ...prev, password: e.target.value }))
            }
            required
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) =>
              setCredentials((prev) => ({ ...prev, email: e.target.value }))
            }
            required
          />
          <input
            type="number"
            placeholder="Age"
            onChange={(e) =>
              setCredentials((prev) => ({ ...prev, age: +e.target.value }))
            }
            required
          />
          <select
            value={credentials.isMale ? "male" : "female"}
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                isMale: e.target.value === "male" ? true : false,
              }))
            }
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <button className="register-button" onClick={handleRegister}>
          Register
        </button>
        <Link className="link" to={"/login"}>
          <button className="register-button">Already have an account?</button>
        </Link>
        {errorMessage && (
          <p className="message error-message">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="message success-message">{successMessage}</p>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
