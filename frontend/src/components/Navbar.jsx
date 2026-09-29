// src/components/Navbar.jsx

import { Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">Home</Link>

      {!user && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}

      {user && (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/profile">Profile</Link>

          {user.role === "ADMIN" && (
            <>
              <Link to="/admin">Admin Dashboard</Link>
              <Link to="/admin/users">Users</Link>
            </>
          )}

          <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
}

export default Navbar;