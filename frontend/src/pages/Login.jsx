// src/pages/Login.jsx

import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext.jsx";

function Login() {
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      const data = await login(email, password);
      console.log("data", data);

      if (data.user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />

        <button type="submit">
          Login
        </button>

      </form>

      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;