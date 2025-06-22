import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Menu from "./pages/Menu";
import Platos from "./pages/Platos";
import PlatoDetalle from "./pages/PlatoDetalle";
import Contacto from "./pages/Contacto";
import SobreNosotros from "./pages/SobreNosotros";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./routes/AdminRoute";
import PrivateRoute from "./routes/PrivateRoute";
import GestionUsuarios from "./pages/GestionUsuarios";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/plato" element={<Platos />} />
        <Route path="/plato/:id" element={<PlatoDetalle />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/nosotros" element={<SobreNosotros />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ Panel accesible a cualquier usuario logueado */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* ✅ Gestión de usuarios SOLO para admins */}
        <Route
          path="/admin/usuarios"
          element={
            <AdminRoute>
              <GestionUsuarios />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
