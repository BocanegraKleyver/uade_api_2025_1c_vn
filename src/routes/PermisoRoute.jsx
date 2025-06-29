import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PermisoRoute = ({ children, permisoRequerido }) => {
  const { usuario } = useAuth();

  if (!usuario) return <Navigate to="/login" />;

  const tienePermiso =
    usuario.rol === "root" ||
    usuario.permisos?.[permisoRequerido];

  return tienePermiso ? children : <Navigate to="/admin/no-autorizado" />;
};

export default PermisoRoute;
