// src/components/AdminRoute.jsx

import { Navigate, Outlet } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

function AdminRoute() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;