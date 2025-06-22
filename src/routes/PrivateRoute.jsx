// src/routes/PrivateRoute.jsx
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { usuario } = useAuth();

  return usuario ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
