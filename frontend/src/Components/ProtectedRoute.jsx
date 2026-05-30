import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../Store/authStore";

const ProtectedRoute = ({ children }) => {
  const { user, isAdmin } = useAuthStore();

  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
