import React from "react";
import {
  Container,
  Typography,
  Button,
  Stack,
  Paper,
} from "@mui/material";
import {
  People,
  RestaurantMenu,
  ListAlt,
  RateReview,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";



const AdminDashboard = () => {
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const rol = usuario?.rol;
  const permisos = usuario?.permisos || {};

const isRoot = usuario?.isRoot;

const puedeVer = {
  usuarios: isRoot || rol === "root" || permisos.gestionarUsuarios,
  platos: isRoot || rol === "root" || permisos.gestionarPlatos,
  logs: isRoot || rol === "root" || permisos.gestionarLogs,

  resenas: isRoot || rol === "root" || permisos.gestionarResenas,
};

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 0,
        px: 2,
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
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 4 }}
        >
          Panel de Administración
        </Typography>

        <Stack spacing={3}>
          {puedeVer.usuarios && (
            <Button
              startIcon={<People />}
              variant="contained"
              size="large"
              fullWidth
              sx={{
                fontWeight: "bold",
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#115293" },
              }}
              onClick={() => navigate("/admin/usuarios")}
            >
              Gestión de Usuarios
            </Button>
          )}

          {puedeVer.platos && (
            <Button
              startIcon={<RestaurantMenu />}
              variant="contained"
              size="large"
              fullWidth
              sx={{
                fontWeight: "bold",
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#115293" },
              }}
              onClick={() => navigate("/admin/platos")}
            >
              Gestión de Platos
            </Button>
          )}

          {puedeVer.logs && (
            <Button
              startIcon={<ListAlt />}
              variant="contained"
              size="large"
              fullWidth
              sx={{
                fontWeight: "bold",
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#115293" },
              }}
              onClick={() => navigate("/admin/logs")}
            >
              Ver Bitácora de Logs
            </Button>
          )}

          {puedeVer.resenas && (
            <Button
              startIcon={<RateReview />}
              variant="contained"
              size="large"
              fullWidth
              sx={{
                fontWeight: "bold",
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#115293" },
              }}
              onClick={() => navigate("/admin/resenias")}
            >
              Gestión de Reseñas
            </Button>
          )}
        </Stack>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
