import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Menu from "./pages/Menu";
import PlatoDetalle from "./pages/PlatoDetalle";
import Contacto from "./pages/Contacto"; // 👉 agregá esta línea

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/plato/:nombre" element={<PlatoDetalle />} />
        <Route path="/contacto" element={<Contacto />} /> {/* 👈 nueva ruta */}
      </Routes>
    </>
  );
};

export default App;
