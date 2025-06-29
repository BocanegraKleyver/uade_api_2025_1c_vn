import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";

const EditarPermisosModal = ({ open, onClose, usuarioEditar, onPermisosActualizados, setSnackbar }) => {
  const { token, usuario: actor } = useAuth();
  const [formPermisos, setFormPermisos] = useState({});
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (usuarioEditar) {
      setFormPermisos(usuarioEditar.permisos);
      setErrorMsg("");
    }
  }, [usuarioEditar]);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setFormPermisos((prev) => ({ ...prev, [name]: checked }));
  };

const isDisabled = (permiso) => {
  const editadoRol = usuarioEditar?.rol;
  const esASiMismo = actor._id === usuarioEditar._id;

  
  if (actor.rol === "root" && editadoRol === "admin") return false;

  
  if (actor.rol === "root" && editadoRol === "usuario") {
    return !(permiso === "gestionarPlatos" || permiso === "gestionarResenas");
  }

  
  if (actor.rol === "admin" && editadoRol === "usuario") {
    return !(permiso === "gestionarPlatos" || permiso === "gestionarResenas");
  }

  
  if (actor.rol === "usuario" && esASiMismo) {
    return !(permiso === "gestionarPlatos" || permiso === "gestionarResenas");
  }

  
  return true;
};


  const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/usuarios/${usuarioEditar._id}/permisos`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ permisos: formPermisos }),
      });
      if (!res.ok) throw new Error("Error al actualizar permisos");

      if (setSnackbar) {
        setSnackbar({
          open: true,
          message: "Permisos actualizados correctamente",
          severity: "success",
        });
      }

      setErrorMsg("");
      onPermisosActualizados();
      onClose();
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  if (!usuarioEditar) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Editar permisos de {usuarioEditar.nombre} {usuarioEditar.apellido}
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" gutterBottom>
          Rol actual: <strong>{usuarioEditar.rol}</strong>
        </Typography>

        {["gestionarUsuarios", "gestionarPlatos", "gestionarLog", "gestionarResenas"].map((permiso) => (
          <FormControlLabel
            key={permiso}
            control={
              <Checkbox
                name={permiso}
                checked={formPermisos[permiso] || false}
                onChange={handleChange}
                disabled={isDisabled(permiso)}
              />
            }
            label={permiso.replace("gestionar", "Gestionar ")}
          />
        ))}

        {errorMsg && <Alert severity="error" sx={{ mt: 2 }}>{errorMsg}</Alert>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSubmit}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};


export default EditarPermisosModal;
