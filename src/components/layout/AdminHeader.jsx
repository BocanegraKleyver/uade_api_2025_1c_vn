import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CambiarPasswordModal from "../admin/CambiarPasswordModal";

const AdminHeader = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const [abrirModalPass, setAbrirModalPass] = useState(false);

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#1f2d3d" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
            ADMIN
          </Typography>
          {usuario && (
            <>
              <Button color="inherit" onClick={() => setAbrirModalPass(true)}>
                Cambiar contraseña
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                Cerrar sesión
              </Button>
            </>
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
