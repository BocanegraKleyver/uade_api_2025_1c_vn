import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useMediaQuery,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const toggleDrawer = (state) => () => setOpen(state);

  const estiloBoton = {
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1rem",
    fontFamily: "Noto Znamenny Musical Notation",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  };

  const menuItems = [
    { label: "Home", to: "/" },
    { label: "Platos", to: "/plato" },
    { label: "Contacto", to: "/contacto" },
    { label: "Sobre Nosotros", to: "/nosotros" },
  ];

  const extras = [];

  if (usuario) {
    extras.push({ label: "Panel Admin", to: "/admin" });
    extras.push({
      label: "Cerrar sesión",
      action: () => {
        logout();
        navigate("/login");
      },
    });
  }

  const drawerList = (
    <Box
      sx={{ width: 250, px: 2 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {[...menuItems, ...extras].map((item, index) => (
          <Box key={`item-${index}`} sx={{ mb: 1 }}>
            {item.to ? (
              <Button
                component={Link}
                to={item.to}
                fullWidth
                variant="text"
                sx={{
                  ...estiloBoton,
                  justifyContent: "flex-start",
                  px: 2,
                }}
              >
                {item.label}
              </Button>
            ) : (
              <Button
                onClick={item.action}
                fullWidth
                variant="contained"
                color="error"
                sx={{
                  fontWeight: "bold",
                  textTransform: "none",
                  color: "#fff",
                  fontFamily: "Noto Znamenny Musical Notation",
                  fontSize: "1rem",
                  px: 2,
                  "&:hover": {
                    backgroundColor: "#b71c1c",
                  },
                }}
              >
                {item.label}
              </Button>
            )}
          </Box>
        ))}
      </List>
    </Box>
  );
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#2c2c2c" }}>
        <Toolbar
          sx={{
            minHeight: { xs: 64, sm: 72 },
            px: { xs: 2, sm: 4, md: 6 },
            py: 1.5,
            position: "relative",
          }}
        >
          
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              fontFamily: "Playfair Display",
              color: "#fff",
              textDecoration: "none",
              fontWeight: "bold",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
              fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
            }}
          >
            Sabores Urbanos
          </Typography>

          
          {!isMobile && (
              <Box sx={{ position: "absolute", right: 16, display: "flex", gap: 3 }}>
                {[...menuItems, ...extras].map((item, i) =>
                  item.to ? (
                    <Button
                      key={`menu-${i}`}
                      component={Link}
                      to={item.to}
                      sx={estiloBoton}
                    >
                      {item.label}
                    </Button>
                  ) : (
                    <Button
                      key={`menu-${i}`}
                      onClick={item.action}
                      variant={item.label === "Cerrar sesión" ? "contained" : "text"}
                      color={item.label === "Cerrar sesión" ? "error" : "inherit"}
                      sx={
                        item.label === "Cerrar sesión"
                          ? {
                              fontWeight: "bold",
                              textTransform: "none",
                              color: "#fff",
                              fontFamily: "Noto Znamenny Musical Notation",
                              fontSize: "1rem",
                              "&:hover": {
                                backgroundColor: "#b71c1c",
                              },
                            }
                          : estiloBoton
                      }
                    >
                      {item.label}
                    </Button>
                  )
                )}
              </Box>
          )}
 
          {isMobile && (
            <>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ position: "absolute", right: 10 }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={open}
                onClose={toggleDrawer(false)}
                PaperProps={{
                  sx: {
                    backgroundColor: "#2c2c2c",
                    color: "#fff",
                    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.5)",
                    borderLeft: "4px solid",
                    borderImage:
                      "linear-gradient(to bottom, #ff5722, #ffc107) 1",
                  },
                }}
              >
                {drawerList}
              </Drawer>
            </>
          )}
        </Toolbar>
      </AppBar>

      
      <Box
        sx={{
          height: "4px",
          background: "linear-gradient(to right, #ff5722, #ffc107)",
        }}
      />
    </>
  );
};

export default Header;
