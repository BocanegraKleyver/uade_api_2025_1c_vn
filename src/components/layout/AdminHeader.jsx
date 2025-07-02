import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CambiarPasswordModal from "../admin/CambiarPasswordModal";

const AdminHeader = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const [abrirModalPass, setAbrirModalPass] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#1f2d3d",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            minHeight: { xs: 64, sm: 72 },
            px: { xs: 2, sm: 4 },
          }}
        >
          <Typography
            variant={isMobile ? "h6" : "h5"}
            sx={{
              fontWeight: "bold",
              color: "#fff",
              fontFamily: "Playfair Display",
            }}
          >
            Sabores Urbanos ADMIN
          </Typography>

          {usuario && (
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                variant="outlined"
                color="inherit"
                size="small"
                onClick={() => setAbrirModalPass(true)}
              >
                Cambiar contraseña
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                Cerrar sesión
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <CambiarPasswordModal
        open={abrirModalPass}
        onClose={() => setAbrirModalPass(false)}
        usuario={usuario}
        logout={logout}
        navigate={navigate}
      />
    </>
  );
};

export default AdminHeader;
