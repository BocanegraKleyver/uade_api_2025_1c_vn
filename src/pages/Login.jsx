import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
} from "@mui/material";

const Login = () => {
  const { login, usuario } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (usuario) navigate("/admin");
  }, [usuario, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3001/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, contraseña }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al iniciar sesión");
      }

      const data = await res.json();
      login(data.token);
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
<Box
  sx={{
    minHeight: "100vh",
    backgroundColor: "#f5f7fa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    p: 2,
  }}
>
  <Paper
    elevation={4}
    sx={{
      width: "100%",
      maxWidth: 420,
      p: 4,
      backgroundColor: "#ffffff",
      color: "#1f2d3d",
      borderRadius: 3,
    }}
  >
    <Typography
  variant="h5"
  align="center"
  gutterBottom
  sx={{ fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1 }}
>
  LOGIN
</Typography>

    {error && (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    )}

    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Correo electrónico"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Contraseña"
        type="password"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
        fullWidth
        required
        sx={{ mb: 3 }}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ fontWeight: "bold", backgroundColor: "#1976d2" }}
      >
        INGRESAR
      </Button>
    </Box>
  </Paper>
</Box>

  );
};

export default Login;
