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
  Switch,
  Select,
  MenuItem,
  FormControl,
  Tooltip,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Snackbar,
  Alert as MuiAlert,
  Stack,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../context/AuthContext";
import CrearUsuarioModal from "../components/admin/CrearUsuarioModal";
import EditarPermisosModal from "../components/admin/EditarPermisosModal";
import { useNavigate } from "react-router-dom";

const GestionUsuarios = () => {
  const { token, usuario } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, usuarioId: null, accion: "" });
  const [rolDialog, setRolDialog] = useState({ open: false, usuarioId: null, nuevoRol: "" });
  const [editarPermisosModalAbierto, setEditarPermisosModalAbierto] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const navigate = useNavigate();

  const fetchUsuarios = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/usuarios/todos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsuarios(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Error al cargar usuarios", severity: "error" });
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchUsuarios();
  }, [fetchUsuarios]);

  const puedeEliminarFisico = (actor, target) => {
    if (actor.rol === "root") return target.rol !== "root";
    if (actor.rol === "admin") return target.rol === "usuario";
    return false;
  };

  const puedeEditarPermisos = (actor, target) => {
    if (actor.rol === "root") return target.rol !== "root";
    if (actor.rol === "admin") return target.rol === "usuario";
    return false;
  };

  const puedeCambiarRol = (actor, target, nuevoRol) => {
    const actorEsRoot = actor.rol === "root";
    const targetEsRoot = target.rol === "root";
    if (actorEsRoot) return !targetEsRoot && nuevoRol !== "root";
    if (actor.rol === "admin") return target.rol === "usuario" && nuevoRol === "admin";
    return false;
  };

  const cambiarRol = async (id, nuevoRol) => {
    const target = usuarios.find((u) => u._id === id);
    if (!puedeCambiarRol(usuario, target, nuevoRol)) {
      setSnackbar({ open: true, message: "No tenés permisos para ese cambio de rol", severity: "error" });
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/api/usuarios/${id}/rol`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ rol: nuevoRol }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al cambiar rol");

      await fetchUsuarios();

      setSnackbar({
        open: true,
        message: data.mensaje || "Rol actualizado",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: "error" });
    }
  };

  const openConfirm = (id, accion) => setConfirmDialog({ open: true, usuarioId: id, accion });

  const handleConfirm = async () => {
    const { usuarioId, accion } = confirmDialog;
    let url = `http://localhost:3001/api/usuarios/${usuarioId}/desactivar`;
    let method = "PUT";
    if (accion === "reactivar") url = `http://localhost:3001/api/usuarios/${usuarioId}/reactivar`;
    else if (accion === "fisico") {
      url = `http://localhost:3001/api/usuarios/${usuarioId}/fisico`;
      method = "DELETE";
    }

    try {
      const res = await fetch(url, { method, headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error("Error al procesar la acción");
      await fetchUsuarios();
      setSnackbar({
        open: true,
        message: accion === "fisico" ? "Usuario eliminado" : accion === "desactivar" ? "Usuario desactivado" : "Usuario reactivado",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: "error" });
    } finally {
      setConfirmDialog({ open: false, usuarioId: null, accion: "" });
    }
  };

  const puedeGestionar = usuario.rol === "admin" || usuario.rol === "root";

  return (
    <Container maxWidth="lg" sx={{ mt: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Paper
        sx={{
          width: "100%",
          p: { xs: 2, sm: 4 },
          borderRadius: 3,
          overflowX: "auto",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
          Gestión de Usuarios
        </Typography>

        {loading ? (
          <Typography align="center">Cargando usuarios...</Typography>
        ) : (
          <Box
  sx={{
    overflowX: "auto",
    "&::-webkit-scrollbar": { height: 6 },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#ccc",
      borderRadius: 3,
    },
  }}
>


            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Apellido</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Rol</TableCell>
                  <TableCell>Activo</TableCell>
                  <TableCell>Permisos</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usuarios.map((u) => {
                  const esRoot = u.rol === "root";
                  return (
                    <TableRow key={u._id}>
                      <TableCell>{u.nombre}</TableCell>
                      <TableCell>{u.apellido}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>
                        {u.rol === "root" ? (
                          <Typography fontWeight="bold">root</Typography>
                        ) : (
                          <FormControl fullWidth>
                            <Select
                              value={u.rol}
                              size="small"
                              onChange={(e) => setRolDialog({ open: true, usuarioId: u._id, nuevoRol: e.target.value })}
                              displayEmpty
                              renderValue={(selected) =>
                                !selected ? <em>Seleccione rol</em> : selected.charAt(0).toUpperCase() + selected.slice(1)
                              }
                            >
                              <MenuItem value={u.rol}>
                                {u.rol.charAt(0).toUpperCase() + u.rol.slice(1)}
                              </MenuItem>
                              {u.rol !== "admin" && puedeCambiarRol(usuario, u, "admin") && (
                                <MenuItem value="admin">Admin</MenuItem>
                              )}
                              {u.rol !== "usuario" && puedeCambiarRol(usuario, u, "usuario") && (
                                <MenuItem value="usuario">Usuario</MenuItem>
                              )}
                            </Select>
                          </FormControl>
                        )}
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={u.activo}
                          disabled={!puedeGestionar || esRoot}
                          onChange={() => openConfirm(u._id, u.activo ? "desactivar" : "reactivar")}
                        />
                      </TableCell>
                      <TableCell>
                        {[u.permisos.gestionarUsuarios && "Usuarios", u.permisos.gestionarPlatos && "Platos", u.permisos.gestionarLogs && "Logs", u.permisos.gestionarResenas && "Reseñas"]
                          .filter(Boolean)
                          .join(", ")}
                      </TableCell>
                      <TableCell align="center">
                        {puedeEditarPermisos(usuario, u) && (
                          <Tooltip title="Editar permisos">
                            <IconButton
                              onClick={() => {
                                setUsuarioSeleccionado(u);
                                setEditarPermisosModalAbierto(true);
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                        <Tooltip title="Eliminar">
                          <IconButton
                            onClick={() => openConfirm(u._id, "fisico")}
                            disabled={!puedeEliminarFisico(usuario, u)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        )}

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center" mt={4}>
          <Button variant="outlined" onClick={() => navigate("/admin")}>
            Volver al Panel
          </Button>
          <Button variant="contained" onClick={() => setModalAbierto(true)} disabled={!puedeGestionar}>
            Crear nuevo usuario
          </Button>
        </Stack>
      </Paper>

      <CrearUsuarioModal
        open={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onUsuarioCreado={fetchUsuarios}
      />

      <EditarPermisosModal
        open={editarPermisosModalAbierto}
        onClose={() => {
          setEditarPermisosModalAbierto(false);
          setUsuarioSeleccionado(null);
        }}
        usuarioEditar={usuarioSeleccionado}
        onPermisosActualizados={fetchUsuarios}
        setSnackbar={setSnackbar}
      />

      <Dialog open={confirmDialog.open} onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}>
        <DialogTitle>
          {confirmDialog.accion === "desactivar" && "¿Desactivar usuario?"}
          {confirmDialog.accion === "reactivar" && "¿Reactivar usuario?"}
          {confirmDialog.accion === "fisico" && "¿Eliminar usuario definitivamente?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmDialog({ ...confirmDialog, open: false })}>Cancelar</Button>
          <Button onClick={handleConfirm} color="error">
            {confirmDialog.accion === "fisico"
              ? "Eliminar"
              : confirmDialog.accion === "desactivar"
              ? "Desactivar"
              : "Reactivar"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={rolDialog.open} onClose={() => setRolDialog({ open: false, usuarioId: null, nuevoRol: "" })}>
        <DialogTitle>{`¿Confirmás cambiar el rol a "${rolDialog.nuevoRol}"?`}</DialogTitle>
        <DialogActions>
          <Button onClick={() => setRolDialog({ open: false, usuarioId: null, nuevoRol: "" })}>Cancelar</Button>
          <Button
            color="primary"
            onClick={() => {
              cambiarRol(rolDialog.usuarioId, rolDialog.nuevoRol);
              setRolDialog({ open: false, usuarioId: null, nuevoRol: "" });
            }}
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

export default GestionUsuarios;
