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
  Switch,
  Tooltip,
  TableContainer,
  Stack,
  Box,
  Fab,
  Dialog,
  DialogTitle,
  DialogActions,
  Snackbar,
  Alert as MuiAlert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CrearEditarPlatoModal from "../components/admin/CrearEditarPlatoModal";

const GestionPlatos = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [platos, setPlatos] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [platoEditar, setPlatoEditar] = useState(null);
  const [sortBy, setSortBy] = useState("nombre");
  const [ascendente, setAscendente] = useState(true);
  const [mostrarIrArriba, setMostrarIrArriba] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, platoId: null, accion: "" });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const fetchPlatos = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3001/api/platos/todos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (Array.isArray(data)) setPlatos(data);
    } catch (err) {
      console.error("Error al traer platos:", err);
    }
  }, [token]);

  useEffect(() => {
    fetchPlatos();
    const handleScroll = () => setMostrarIrArriba(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchPlatos]);

  const handleEliminar = async () => {
    try {
      await fetch(`http://localhost:3001/api/platos/${confirmDialog.platoId}/fisico`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPlatos();
      setSnackbar({ open: true, message: "Plato eliminado", severity: "success" });
    } catch (err) {
      console.error("Error al eliminar plato:", err);
      setSnackbar({ open: true, message: "Error al eliminar plato", severity: "error" });
    } finally {
      setConfirmDialog({ open: false, platoId: null, accion: "" });
    }
  };

  const handleToggleActivo = (id, activo) => {
    setConfirmDialog({
      open: true,
      platoId: id,
      accion: activo ? "desactivar" : "reactivar",
    });
  };

  const handleConfirmToggle = async () => {
    const { platoId, accion } = confirmDialog;
    const endpoint = accion === "desactivar" ? "desactivar" : "reactivar";

    try {
      await fetch(`http://localhost:3001/api/platos/${platoId}/${endpoint}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPlatos();
      setSnackbar({
        open: true,
        message: `Plato ${accion === "desactivar" ? "desactivado" : "reactivado"}`,
        severity: "success",
      });
    } catch (err) {
      console.error("Error al cambiar estado:", err);
      setSnackbar({ open: true, message: "Error al cambiar estado", severity: "error" });
    } finally {
      setConfirmDialog({ open: false, platoId: null, accion: "" });
    }
  };

  const handleSort = (campo) => {
    if (campo === sortBy) {
      setAscendente(!ascendente);
    } else {
      setSortBy(campo);
      setAscendente(true);
    }
  };

  const platosOrdenados = [...platos].sort((a, b) => {
    const valorA = a[sortBy];
    const valorB = b[sortBy];
    if (typeof valorA === "string") {
      return ascendente
        ? valorA.localeCompare(valorB)
        : valorB.localeCompare(valorA);
    } else {
      return ascendente ? valorA - valorB : valorB - valorA;
    }
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 6 }}>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          rowGap={2}
          mb={2}
        >
          <Typography variant="h4" fontWeight="bold">
            Gestión de Platos
          </Typography>

          <Stack direction="row" spacing={2} flexWrap="wrap">
            <Button variant="outlined" onClick={() => navigate("/admin")}>
              Volver al Panel
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                setPlatoEditar(null);
                setModalAbierto(true);
              }}
            >
              Crear nuevo plato
            </Button>
          </Stack>
        </Box>

        <TableContainer sx={{ overflowX: "auto" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><b>Imagen</b></TableCell>
                <TableCell onClick={() => handleSort("nombre")} sx={{ cursor: "pointer" }}><b>Nombre {sortBy === "nombre" && (ascendente ? "▲" : "▼")}</b></TableCell>
                <TableCell onClick={() => handleSort("precio")} sx={{ cursor: "pointer" }}><b>Precio {sortBy === "precio" && (ascendente ? "▲" : "▼")}</b></TableCell>
                <TableCell><b>Categoría</b></TableCell>
                <TableCell><b>Ingredientes</b></TableCell>
                <TableCell><b>Etiquetas</b></TableCell>
                <TableCell onClick={() => handleSort("activo")} sx={{ cursor: "pointer" }}><b>Activo {sortBy === "activo" && (ascendente ? "▲" : "▼")}</b></TableCell>
                <TableCell align="center"><b>Acciones</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {platosOrdenados.map((plato) => (
                <TableRow key={plato._id}>
                  <TableCell>
                    {plato.imagen ? (
                      <img
                        src={`http://localhost:3001/uploads/${plato.imagen}`}
                        alt={plato.nombre}
                        style={{ width: 60, height: 40, objectFit: "cover", borderRadius: 4 }}
                      />
                    ) : (
                      <Typography variant="caption" color="textSecondary">Sin imagen</Typography>
                    )}
                  </TableCell>
                  <TableCell>{plato.nombre}</TableCell>
                  <TableCell>${plato.precio}</TableCell>
                  <TableCell>{plato.categoria}</TableCell>
                  <TableCell>{plato.ingredientes?.join(", ")}</TableCell>
                  <TableCell>{plato.etiquetas?.join(", ")}</TableCell>
                  <TableCell>
                    <Switch
                      checked={plato.activo}
                      onChange={() => handleToggleActivo(plato._id, plato.activo)}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Tooltip title="Editar">
                        <IconButton onClick={() => { setPlatoEditar(plato); setModalAbierto(true); }}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton color="error" onClick={() => setConfirmDialog({ open: true, platoId: plato._id, accion: "eliminar" })}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <CrearEditarPlatoModal
        open={modalAbierto}
        onClose={() => setModalAbierto(false)}
        platoEditar={platoEditar}
        onPlatoGuardado={fetchPlatos}
      />

      <Dialog open={confirmDialog.open} onClose={() => setConfirmDialog({ open: false, platoId: null, accion: "" })}>
        <DialogTitle>
          {confirmDialog.accion === "eliminar" && "¿Eliminar plato definitivamente?"}
          {confirmDialog.accion === "desactivar" && "¿Desactivar plato?"}
          {confirmDialog.accion === "reactivar" && "¿Reactivar plato?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmDialog({ open: false, platoId: null, accion: "" })}>Cancelar</Button>
          <Button
            color={confirmDialog.accion === "eliminar" ? "error" : "primary"}
            onClick={
              confirmDialog.accion === "eliminar" ? handleEliminar : handleConfirmToggle
            }
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

      {mostrarIrArriba && (
        <Fab
          color="primary"
          size="small"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 999 }}
        >
          <ArrowUpwardIcon />
        </Fab>
      )}
    </Container>
  );
};

export default GestionPlatos;
