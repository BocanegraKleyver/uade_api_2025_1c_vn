import React, { useEffect, useState, useCallback } from "react";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
  Snackbar,
  Alert as MuiAlert,
  Tooltip,
  TextField,
  Stack,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TableContainer,
  TableSortLabel,
} from "@mui/material";
import {
  VisibilityOff,
  Visibility,
  Reply,
  Edit,
  Save,
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const GestionResenias = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [resenas, setResenas] = useState([]);
  const [respuesta, setRespuesta] = useState({});
  const [editando, setEditando] = useState({});
  const [confirmDialog, setConfirmDialog] = useState({ open: false, id: null, accion: "" });
  const [responderDialog, setResponderDialog] = useState({ open: false, id: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [sortConfig, setSortConfig] = useState({ field: "", direction: "asc" });
  const [editarDialog, setEditarDialog] = useState({ open: false, id: null });


  const fetchResenas = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3001/api/resenas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (Array.isArray(data)) setResenas(data);
    } catch (err) {
      console.error("Error al traer reseñas:", err);
    }
  }, [token]);

  useEffect(() => {
    fetchResenas();
  }, [fetchResenas]);

  const handleResponder = async () => {
    const id = responderDialog.id;
    const texto = respuesta[id]?.trim();
    if (!texto) {
      setSnackbar({ open: true, message: "La respuesta no puede estar vacía", severity: "warning" });
      return;
    }
    if (texto.length > 280) {
      setSnackbar({ open: true, message: "La respuesta excede los 280 caracteres", severity: "warning" });
      return;
    }
    try {
      await fetch(`http://localhost:3001/api/resenas/${id}/responder`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ texto }),
      });
      setSnackbar({ open: true, message: "Respuesta enviada", severity: "success" });
      fetchResenas();
    } catch (err) {
      setSnackbar({ open: true, message: "Error al responder", severity: "error" });
    } finally {
      setResponderDialog({ open: false, id: null });
    }
  };

  const handleEditar = async (id) => {
    const texto = respuesta[id]?.trim();
    if (!texto) {
      setSnackbar({ open: true, message: "La respuesta no puede estar vacía", severity: "warning" });
      return;
    }
    if (texto.length > 280) {
      setSnackbar({ open: true, message: "La respuesta excede los 280 caracteres", severity: "warning" });
      return;
    }
    try {
      await fetch(`http://localhost:3001/api/resenas/${id}/responder`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ texto }),
      });
      setSnackbar({ open: true, message: "Respuesta editada", severity: "success" });
      fetchResenas();
    } catch (err) {
      setSnackbar({ open: true, message: "Error al editar respuesta", severity: "error" });
    } finally {
      setEditando({ ...editando, [id]: false });
    }
  };

  const handleToggleActivo = (id, activo) => {
    setConfirmDialog({ open: true, id, accion: activo ? "ocultar" : "mostrar" });
  };

  const handleConfirmToggle = async () => {
    const { id, accion } = confirmDialog;
    try {
      await fetch(`http://localhost:3001/api/resenas/${id}/${accion}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      setSnackbar({ open: true, message: `Reseña ${accion === "ocultar" ? "ocultada" : "mostrada"}`, severity: "success" });
      fetchResenas();
    } catch (err) {
      setSnackbar({ open: true, message: "Error al actualizar reseña", severity: "error" });
    } finally {
      setConfirmDialog({ open: false, id: null, accion: "" });
    }
  };

  const handleSort = (field) => {
    const isAsc = sortConfig.field === field && sortConfig.direction === "asc";
    setSortConfig({ field, direction: isAsc ? "desc" : "asc" });
  };

  const sortedResenas = [...resenas].sort((a, b) => {
    const dir = sortConfig.direction === "asc" ? 1 : -1;
    if (sortConfig.field === "plato") return a.platoNombre.localeCompare(b.platoNombre) * dir;
    if (sortConfig.field === "visible") return (a.activo === b.activo ? 0 : a.activo ? -1 : 1) * dir;
    if (sortConfig.field === "respondida") return (a.respuesta?.texto ? 1 : 0 - b.respuesta?.texto ? 1 : 0) * dir;
    return 0;
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap">
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Gestión de Reseñas
          </Typography>
          <Button variant="outlined" onClick={() => navigate("/admin")}>Volver al Panel</Button>
        </Stack>

        <TableContainer sx={{ overflowX: "auto" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><TableSortLabel active={sortConfig.field === "plato"} direction={sortConfig.direction} onClick={() => handleSort("plato")}>Plato</TableSortLabel></TableCell>
                <TableCell>Usuario</TableCell>
                <TableCell>Comentario</TableCell>
                <TableCell>Valoración</TableCell>
                <TableCell>Respuesta</TableCell>
                <TableCell><TableSortLabel active={sortConfig.field === "visible"} direction={sortConfig.direction} onClick={() => handleSort("visible")}>Visible</TableSortLabel></TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedResenas.map((r) => (
                <TableRow key={r._id}>
                  <TableCell>{r.platoNombre}</TableCell>
                  <TableCell>{r.nombre}</TableCell>
                  <TableCell>{r.comentario}</TableCell>
                  <TableCell>{r.valoracion} ⭐</TableCell>
                  <TableCell>
                    {r.respuesta?.texto && !editando[r._id] ? (
                      <Stack spacing={0.5}>
                        <Typography variant="body2">{r.respuesta.texto}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          — <b>{r.respuesta.respondidoPor}</b> {(r.respuesta.editado ? "(editado)" : "")}<br />
                          <span style={{ fontSize: "0.75rem", color: "#666" }}>{new Date(r.respuesta.fecha).toLocaleString("es-AR")}</span>
                        </Typography>
                        <Tooltip title="Editar respuesta">
                          <IconButton onClick={() => {
                            setEditando({ ...editando, [r._id]: true });
                            setRespuesta({ ...respuesta, [r._id]: r.respuesta.texto });
                          }}><Edit /></IconButton>
                        </Tooltip>
                      </Stack>
                    ) : (
                      <Stack direction="row" spacing={1} alignItems="center">
                        <TextField
                          size="small"
                          placeholder="Escribir respuesta"
                          inputProps={{ maxLength: 280 }}
                          value={respuesta[r._id] || ""}
                          onChange={(e) => setRespuesta({ ...respuesta, [r._id]: e.target.value })}
                        />
                        {editando[r._id] ? (
                          <Tooltip title="Guardar edición">
                            <IconButton onClick={() => setEditarDialog({ open: true, id: r._id })}>
  <Save />
</IconButton>

                          </Tooltip>
                        ) : (
                          <IconButton onClick={() => setResponderDialog({ open: true, id: r._id })}><Reply /></IconButton>
                        )}
                      </Stack>
                    )}
                  </TableCell>
                  <TableCell>{r.activo ? "Sí" : "No"}</TableCell>
                  <TableCell align="center">
                    <Tooltip title={r.activo ? "Ocultar reseña" : "Mostrar reseña"}>
                      <IconButton onClick={() => handleToggleActivo(r._id, r.activo)}>
                        {r.activo ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      
      <Dialog open={confirmDialog.open} onClose={() => setConfirmDialog({ open: false, id: null, accion: "" })}>
        <DialogTitle>
          {confirmDialog.accion === "ocultar" ? "¿Ocultar esta reseña del público?" : "¿Mostrar esta reseña nuevamente?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmDialog({ open: false, id: null, accion: "" })}>Cancelar</Button>
          <Button onClick={handleConfirmToggle} autoFocus>Confirmar</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={responderDialog.open} onClose={() => setResponderDialog({ open: false, id: null })}>
        <DialogTitle>¿Enviar respuesta?</DialogTitle>
        <DialogContent>
          <Typography variant="body2">No se podrá eliminar una vez enviada.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResponderDialog({ open: false, id: null })}>Cancelar</Button>
          <Button onClick={handleResponder} autoFocus>Confirmar</Button>
        </DialogActions>
      </Dialog>

<Dialog open={editarDialog.open} onClose={() => setEditarDialog({ open: false, id: null })}>
  <DialogTitle>¿Guardar edición?</DialogTitle>
  <DialogContent>
    <Typography variant="body2">
      Estás por modificar una respuesta existente. Esta acción quedará registrada como <b>editada</b>.
    </Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setEditarDialog({ open: false, id: null })}>Cancelar</Button>
    <Button
      onClick={() => {
        handleEditar(editarDialog.id);
        setEditarDialog({ open: false, id: null });
      }}
      autoFocus
    >
      Confirmar
    </Button>
  </DialogActions>
</Dialog>



      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert elevation={6} variant="filled" severity={snackbar.severity}>
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default GestionResenias;
