import React from "react";
import { Routes, Route } from "react-router-dom";
import PublicLayout from "./components/layout/PublicLayout";
import AdminLayout from "./components/layout/AdminLayout";
import Menu from "./pages/Menu";
import Platos from "./pages/Platos";
import PlatoDetalle from "./pages/PlatoDetalle";
import Contacto from "./pages/Contacto";
import SobreNosotros from "./pages/SobreNosotros";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import GestionUsuarios from "./pages/GestionUsuarios";
import GestionPlatos from "./pages/GestionPlatos";
import GestionLogs from "./pages/GestionLogs";
import GestionResenias from "./pages/GestionResenias";
import NoAutorizado from "./pages/NoAutorizado";

import PrivateRoute from "./routes/PrivateRoute";

import PermisoRoute from "./routes/PermisoRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Menu />} />
        <Route path="plato" element={<Platos />} />
        <Route path="plato/:id" element={<PlatoDetalle />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="nosotros" element={<SobreNosotros />} />
      </Route>

      <Route path="/login" element={<Login />} />

      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<AdminDashboard />} />

        <Route path="no-autorizado" element={<NoAutorizado />} />

        <Route
          path="usuarios"
          element={
            <PermisoRoute permisoRequerido="gestionarUsuarios">
              <GestionUsuarios />
            </PermisoRoute>
          }
        />
        <Route
          path="platos"
          element={
            <PermisoRoute permisoRequerido="gestionarPlatos">
              <GestionPlatos />
            </PermisoRoute>
          }
        />
        <Route
          path="logs"
          element={
            <PermisoRoute permisoRequerido="gestionarLog">
              <GestionLogs />
            </PermisoRoute>
          }
        />
        <Route
          path="resenias"
          element={
            <PermisoRoute permisoRequerido="gestionarResenas">
              <GestionResenias />
            </PermisoRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
