import React from "react";
import { Container, Typography } from "@mui/material";

const GestionPlatos = () => {
  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Gestión de Platos
      </Typography>
      <Typography>Esta es la sección para gestionar los platos del menú.</Typography>
    </Container>
  );
};

export default GestionPlatos;
