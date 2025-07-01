import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Stack,
  Alert,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";

const categorias = [
  "Entrantes", "Ensaladas", "Carnes", "Pescados", "Pastas",
  "Postres", "Bebidas alcohólicas", "Bebidas sin alcohol",
];

const CrearEditarPlatoModal = ({ open, onClose, onPlatoGuardado, platoEditar = null }) => {
  const { token } = useAuth();
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
    ingredientes: "",
    alergenos: "",
    etiquetas: "",
    imagen: null,
    activo: true,
  });
  const [errores, setErrores] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (platoEditar) {
      setForm({
        ...platoEditar,
        ingredientes: platoEditar.ingredientes?.join(", ") || "",
        alergenos: platoEditar.alergenos?.join(", ") || "",
        etiquetas: platoEditar.etiquetas?.join(", ") || "",
        imagen: null,
      });
    } else {
      resetForm();
    }
  }, [platoEditar, open]);

  const resetForm = () => {
    setForm({
      nombre: "",
      descripcion: "",
      precio: "",
      categoria: "",
      ingredientes: "",
      alergenos: "",
      etiquetas: "",
      imagen: null,
      activo: true,
    });
    setErrores({});
    setErrorMsg("");
    setSuccessMsg("");
  };

  const validar = () => {
    const nuevoErrores = {};
    const precioNumerico = Number(form.precio);

    if (!form.nombre.trim()) nuevoErrores.nombre = "El nombre es obligatorio.";
    if (!form.precio || isNaN(precioNumerico) || precioNumerico <= 0)
      nuevoErrores.precio = "El precio debe ser un número positivo.";
    if (!form.categoria || form.categoria.trim() === "")
      nuevoErrores.categoria = "La categoría es obligatoria.";

    const campoRegex = /^[\w\sáéíóúüñ,.-]*$/;

    if (form.ingredientes && !campoRegex.test(form.ingredientes))
      nuevoErrores.ingredientes = "Formato inválido (usa coma para separar).";
    if (form.alergenos && !campoRegex.test(form.alergenos))
      nuevoErrores.alergenos = "Formato inválido (usa coma para separar).";
    if (form.etiquetas && !campoRegex.test(form.etiquetas))
      nuevoErrores.etiquetas = "Formato inválido (usa coma para separar).";

    if (form.imagen) {
      const tiposPermitidos = ["image/jpeg", "image/png", "image/gif"];
      if (!tiposPermitidos.includes(form.imagen.type)) {
        nuevoErrores.imagen = "Solo se permiten JPG, PNG o GIF.";
      }
    }

    setErrores(nuevoErrores);
    return Object.keys(nuevoErrores).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setForm((prev) => ({ ...prev, imagen: files[0] }));
    } else if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }

    if (["nombre", "precio", "categoria", "ingredientes", "alergenos", "etiquetas"].includes(name)) {
      setErrores((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async () => {
    if (!validar()) return;

    setErrorMsg("");
    setSuccessMsg("");

    const data = new FormData();
    data.append("nombre", form.nombre.trim());
    data.append("descripcion", form.descripcion);
    data.append("precio", form.precio);
    data.append("categoria", form.categoria);
    data.append("ingredientes", form.ingredientes);
    data.append("alergenos", form.alergenos);
    data.append("etiquetas", form.etiquetas);
    data.append("activo", form.activo ? "true" : "false");
    if (form.imagen) data.append("imagen", form.imagen);

    try {
      const res = await fetch(
        `http://localhost:3001/api/platos${platoEditar ? `/${platoEditar._id}` : ""}`,
        {
          method: platoEditar ? "PUT" : "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: data,
        }
      );

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Error al guardar el plato.");

      setSuccessMsg("✅ Plato guardado correctamente.");
      setTimeout(() => {
        onPlatoGuardado();
        onClose();
        resetForm();
      }, 1500);
    } catch (err) {
      setErrorMsg(err.message || "❌ Error al guardar el plato. Contacte al administrador.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{platoEditar ? "Editar plato" : "Crear nuevo plato"}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            error={!!errores.nombre}
            helperText={errores.nombre}
            fullWidth
            required
          />
          <TextField
            label="Descripción"
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            fullWidth
            multiline
            rows={2}
          />
          <TextField
            label="Precio"
            name="precio"
            type="number"
            value={form.precio}
            onChange={handleChange}
            error={!!errores.precio}
            helperText={errores.precio}
            fullWidth
            required
          />
          <TextField
            select
            label="Categoría"
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            error={!!errores.categoria}
            helperText={errores.categoria}
            fullWidth
            required
          >
            {categorias.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Ingredientes (coma)"
            name="ingredientes"
            value={form.ingredientes}
            onChange={handleChange}
            error={!!errores.ingredientes}
            helperText={errores.ingredientes}
            fullWidth
          />
          <TextField
            label="Alérgenos (coma)"
            name="alergenos"
            value={form.alergenos}
            onChange={handleChange}
            error={!!errores.alergenos}
            helperText={errores.alergenos}
            fullWidth
          />
          <TextField
            label="Etiquetas (coma)"
            name="etiquetas"
            value={form.etiquetas}
            onChange={handleChange}
            error={!!errores.etiquetas}
            helperText={errores.etiquetas}
            fullWidth
          />
          <Button variant="outlined" component="label">
            {form.imagen ? form.imagen.name : "Seleccionar imagen"}
            <input
              type="file"
              hidden
              name="imagen"
              onChange={handleChange}
              accept="image/jpeg,image/png,image/gif"
            />
          </Button>
          {errores.imagen && <Alert severity="warning">{errores.imagen}</Alert>}
          <FormControlLabel
            control={
              <Checkbox name="activo" checked={form.activo} onChange={handleChange} />
            }
            label="Plato activo"
          />
          {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
          {successMsg && <Alert severity="success">{successMsg}</Alert>}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CrearEditarPlatoModal;
