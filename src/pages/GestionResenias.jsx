import React from "react";
import { Container, Typography } from "@mui/material";

const GestionResenias = () => {
  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Gestión de Reseñas
      </Typography>
      <Typography>Acá podrás gestionar las reseñas dejadas por los usuarios.</Typography>
    </Container>
  );
};

export default GestionResenias;
