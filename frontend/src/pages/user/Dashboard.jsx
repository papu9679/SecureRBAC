// src/pages/user/Dashboard.jsx

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>User Dashboard</h1>

      <h2>Welcome, {user.name}</h2>

      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}

export default Dashboard;