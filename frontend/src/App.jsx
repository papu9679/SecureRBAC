// src/App.jsx

import { Routes, Route } from "react-router";

import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";

// Public pages
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

// User pages
import Dashboard from "./pages/user/Dashboard.jsx";
import Profile from "./pages/user/Profile.jsx";
import ChangePassword from "./pages/user/ChangePassword.jsx";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import Users from "./pages/admin/Users.jsx";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        {/* LOGGED-IN USER ROUTES */}
        <Route element={<ProtectedRoute />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/change-password"
            element={<ChangePassword />}
          />

        </Route>


        {/* ADMIN ROUTES */}
        <Route element={<AdminRoute />}>

          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/users"
            element={<Users />}
          />

        </Route>

      </Routes>
    </>
  );
}

export default App;