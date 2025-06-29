import React from "react";
import { Container, Typography } from "@mui/material";

const GestionLogs = () => {
  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Gestión de Logs
      </Typography>
      <Typography>Esta es la sección para visualizar los logs del sistema.</Typography>
    </Container>
  );
};

export default GestionLogs;
