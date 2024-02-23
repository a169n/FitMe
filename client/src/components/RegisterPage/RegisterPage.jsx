import { useState } from "react";
import { useRegisterMutation } from "../../redux/services/authApi";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [credentials, setCredentials] = useState({
    username: null,
    password: null,
    email: null,
    age: 0,
    isMale: false,
  });

  const [register] = useRegisterMutation();

  const handleRegister = async () => {
    try {
      const response = await register(credentials);

      console.log("Registration successful:", response);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div>
      <h1>Enter your credentials</h1>
      <div className="input-box">
        <input
          type="text"
          placeholder="Username"
          onChange={(e) =>
            setCredentials((prev) => ({ ...prev, username: e.target.value }))
          }
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setCredentials((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setCredentials((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <input
          type="number"
          placeholder="Age"
          onChange={(e) =>
            setCredentials((prev) => ({ ...prev, age: +e.target.value }))
          }
        />
        <label>
          <input
            type="checkbox"
            onChange={(e) =>
              setCredentials((prev) => ({ ...prev, isMale: e.target.checked }))
            }
          />
          Male
        </label>
      </div>
      <button onClick={handleRegister}>Register</button>
      <Link className="link" to={"/login"}>
        <button>Already have an account?</button>
      </Link>
    </div>
  );
};

export default RegisterPage;
