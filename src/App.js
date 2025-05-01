import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Menu from "./pages/Menu";
import Platos from "./pages/Platos";
import PlatoDetalle from "./pages/PlatoDetalle";
import Contacto from "./pages/Contacto";
import SobreNosotros from "./pages/SobreNosotros";

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
      </Routes>
    </>
  );
};

export default App;
