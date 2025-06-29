import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1f2d3d" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
          ADMIN
        </Typography>
        {usuario && (
          <Button
            color="inherit"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Cerrar sesión
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
