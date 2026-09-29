// src/pages/Register.jsx

import { useState } from "react";
import { useNavigate } from "react-router";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      const res = await fetch(
        "http://localhost:3000/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            name,
            email,
            password
          })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      navigate("/login");

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br />

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
          Register
        </button>

      </form>

      {error && <p>{error}</p>}
    </div>
  );
}

export default Register;