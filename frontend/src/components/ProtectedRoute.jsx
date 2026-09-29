// src/components/ProtectedRoute.jsx

import { Navigate, Outlet } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

function ProtectedRoute() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;