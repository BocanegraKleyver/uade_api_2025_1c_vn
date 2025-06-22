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
        <Route
          path="/admin"
          element={
            <AdminRoute>
              {" "}
              <AdminDashboard />{" "}
            </AdminRoute>
          }
        />
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
