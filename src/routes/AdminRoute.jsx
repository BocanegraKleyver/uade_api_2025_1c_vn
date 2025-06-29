import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { usuario } = useAuth();

  if (!usuario) return <Navigate to="/login" />;

  if (usuario.rol !== "admin" && usuario.rol !== "root") {
  return <Navigate to="/no-autorizado" />;
}

  return children;
};

export default AdminRoute;
