import React from "react";
import { Typography, Container, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NoAutorizado = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 0,
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          p: 5,
          borderRadius: 3,
          backgroundColor: "#fff",
          boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          🚫 Acceso denegado
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          No tenés permisos para acceder a esta sección del panel.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/admin")}
          sx={{
            fontWeight: "bold",
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#115293" },
          }}
        >
          Volver al panel
        </Button>
      </Paper>
    </Container>
  );
};

export default NoAutorizado;
