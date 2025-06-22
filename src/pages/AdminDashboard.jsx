import React from "react";
import { Container, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "../components/layout/Footer";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { usuario } = useAuth();

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          mt: 8,
          mb: 6,
          maxWidth: "1200px",
          mx: "auto",
          padding: 6,
          borderRadius: 4,
          background: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(14px)",
          boxShadow: "0 0 30px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontFamily: "Playfair Display",
            fontWeight: "bold",
            textAlign: "center",
            mb: 4,
          }}
        >
          Panel de Administración
        </Typography>

        <Stack spacing={3} mt={2} alignItems="center">
          {usuario?.rol === "admin" && (
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/admin/usuarios")}
              sx={{
                fontWeight: "bold",
                fontFamily: "Noto Znamenny Musical Notation",
              }}
            >
              Gestión de Usuarios
            </Button>
          )}

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/admin/platos")}
            sx={{
              fontWeight: "bold",
              fontFamily: "Noto Znamenny Musical Notation",
            }}
          >
            Gestión de Platos
          </Button>

          {usuario?.rol === "admin" && (
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/admin/logs")}
              sx={{
                fontWeight: "bold",
                fontFamily: "Noto Znamenny Musical Notation",
              }}
            >
              Ver Bitácora de Logs
            </Button>
          )}
        </Stack>
      </Container>

      <Footer />
    </>
  );
};

export default AdminDashboard;
