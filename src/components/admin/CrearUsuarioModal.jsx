// src/components/admin/CrearUsuarioModal.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Alert,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";

const CrearUsuarioModal = ({ open, onClose, onUsuarioCreado }) => {
  const { token } = useAuth();
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    rol: "usuario",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!form.nombre || !form.email || !form.password) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (form.password.length < 6) {
  setError("La contraseña debe tener al menos 6 caracteres.");
  return;
}


    try {
      const res = await fetch("http://localhost:3001/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
  nombre: form.nombre,
  email: form.email,
  contraseña: form.password, // 👈 nombre correcto según el modelo
  rol: form.rol,
}),
      });
      console.log("Enviando:", form);
      const data = await res.json();
if (!res.ok) throw new Error(data.mensaje || "Error al crear el usuario.");


      setSuccess("Usuario creado correctamente.");
      onUsuarioCreado(); // recarga lista de usuarios
      setForm({ nombre: "", email: "", password: "", rol: "usuario" });
      onClose(); // cierra modal
    } catch (err) {
      setError(err.message || "Error al crear usuario.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Crear nuevo usuario</DialogTitle>
      <DialogContent>
        <TextField
          label="Nombre"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Contraseña"
          name="password"
          value={form.password}
          onChange={handleChange}
          type="password"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Rol"
          name="rol"
          select
          value={form.rol}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          <MenuItem value="usuario">Usuario</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </TextField>

        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained">Crear</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CrearUsuarioModal;
