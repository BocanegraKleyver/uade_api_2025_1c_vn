import React, { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, MenuItem, Typography,
  FormControlLabel, Checkbox, Alert
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";

const CrearUsuarioModal = ({ open, onClose, onUsuarioCreado }) => {
  const { token } = useAuth();
  const initialForm = {
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    rol: "usuario",
    permisos: {
      gestionarUsuarios: false,
      gestionarPlatos: false,
      gestionarLogs: false,
      gestionarResenas: false,
    },
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");


  const resetForm = () => {
    setForm(initialForm);
    setErrors({});
    setErrorMsg("");
    setSuccessMsg("");
  };

useEffect(() => {
  if (!open) resetForm();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [open]);


useEffect(() => {
  if (form.rol === "admin") {
    setForm(f => ({
      ...f,
      permisos: {
        gestionarUsuarios: true,
        gestionarPlatos: true,
        gestionarLogs: true,
        gestionarResenas: true,
      },
    }));
  } else if (form.rol === "usuario") {
    setForm(f => ({
      ...f,
      permisos: {
        gestionarUsuarios: false,
        gestionarPlatos: false,
        gestionarLogs: false,
        gestionarResenas: false,
      },
    }));
  }
}, [form.rol]);


  const handleChange = e => {
    const { name, value, checked, type } = e.target;
    if (name.startsWith("permisos.")) {
      const key = name.split(".")[1];
      setForm(f => ({ ...f, permisos: { ...f.permisos, [key]: checked } }));
    } else {
      setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    }
  };

const validate = () => {
  const errs = {};
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  
  if (form.nombre.trim().length < 2) errs.nombre = "Nombre mínimo 2 caracteres";
  else if (form.nombre.trim().length > 30) errs.nombre = "Nombre máximo 30 caracteres";

  
  if (form.apellido.trim().length < 2) errs.apellido = "Apellido mínimo 2 caracteres";
  else if (form.apellido.trim().length > 30) errs.apellido = "Apellido máximo 30 caracteres";

  
  if (!emailRegex.test(form.email)) errs.email = "Email inválido";
  else if (form.email.length > 50) errs.email = "Email máximo 50 caracteres";

  
  if (form.password.length < 6) errs.password = "Contraseña mínimo 6 caracteres";
  else if (form.password.length > 20) errs.password = "Contraseña máximo 20 caracteres";

  setErrors(errs);
  return Object.keys(errs).length === 0;
};


  const handleSubmit = async () => {
    setErrorMsg("");
    setSuccessMsg("");

    if (!validate()) return;


if (form.rol === "usuario") {
  const { gestionarPlatos, gestionarResenas } = form.permisos;
  if (!gestionarPlatos && !gestionarResenas) {
    setErrorMsg("Debés asignar al menos un permiso (Platos o Reseñas) para el rol usuario.");
    return;
  }
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
          apellido: form.apellido,
          email: form.email,
          contraseña: form.password,
          rol: form.rol,
          permisos: form.permisos,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al crear usuario");

      setSuccessMsg("Usuario creado correctamente");
      onUsuarioCreado();
      resetForm();
      onClose();
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Crear nuevo usuario</DialogTitle>
      <DialogContent>

<TextField
  label="Nombre"
  name="nombre"
  value={form.nombre}
  onChange={handleChange}
  fullWidth
  margin="normal"
  inputProps={{ minLength: 2, maxLength: 30 }}
  error={!!errors.nombre}
  helperText={errors.nombre}
/>

<TextField
  label="Apellido"
  name="apellido"
  value={form.apellido}
  onChange={handleChange}
  fullWidth
  margin="normal"
  inputProps={{ minLength: 2, maxLength: 30 }}
  error={!!errors.apellido}
  helperText={errors.apellido}
/>

<TextField
  label="Email"
  name="email"
  type="email"
  value={form.email}
  onChange={handleChange}
  fullWidth
  margin="normal"
  inputProps={{ maxLength: 50 }}
  error={!!errors.email}
  helperText={errors.email}
/>

<TextField
  label="Contraseña"
  name="password"
  type="password"
  value={form.password}
  onChange={handleChange}
  fullWidth
  margin="normal"
  inputProps={{ minLength: 6, maxLength: 20 }}
  error={!!errors.password}
  helperText={errors.password}
/>

        

        <TextField
          select label="Rol" name="rol"
          value={form.rol} onChange={handleChange}
          fullWidth margin="normal"
        >
          <MenuItem value="usuario">Usuario</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </TextField>

        <Typography variant="subtitle1" mt={2}>Permisos:</Typography>
        {
        [
  ["gestionarUsuarios", "Usuarios"],
  ["gestionarPlatos", "Platos"],
  ["gestionarLogs", "Logs"],
  ["gestionarResenas", "Reseñas"],
].map(([key, label]) => (
  <FormControlLabel
    key={key}
    control={
      <Checkbox
        name={`permisos.${key}`}
        checked={form.permisos[key]}
        onChange={handleChange}
        disabled={
          form.rol === "usuario" &&
          (key === "gestionarUsuarios" || key === "gestionarLogs")
        }
      />
    }
    label={label}
  />
))

                       /* disabled={
  (form.rol === "usuario" && (key === "gestionarUsuarios" || key === "gestionarLogs")) ||
  form.rol === "admin" 
            }*/
        }

        {errorMsg && <Alert severity="error" sx={{ mt: 2 }}>{errorMsg}</Alert>}
        {successMsg && <Alert severity="success" sx={{ mt: 2 }}>{successMsg}</Alert>}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { resetForm(); onClose(); }}>Cancelar</Button>
        <Button variant="contained" onClick={handleSubmit}>Crear</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CrearUsuarioModal;
