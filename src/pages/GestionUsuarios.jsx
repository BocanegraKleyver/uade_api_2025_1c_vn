// src/pages/GestionUsuarios.jsx
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
  Box,
  Tooltip,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import EditIcon from "@mui/icons-material/Edit";
import Footer from "../components/layout/Footer";
import CrearUsuarioModal from "../components/admin/CrearUsuarioModal";

const GestionUsuarios = () => {
  const { token } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    usuarioId: null,
    nuevoEstado: true,
  });

  /*const fetchUsuarios = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3001/api/usuarios", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("Respuesta no válida");
      setUsuarios(data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);*/


const fetchUsuarios = useCallback(async () => {
  try {
    const res = await fetch("http://localhost:3001/api/usuarios/todos", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("fetch usuarios todos, status:", res.status);
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error("Respuesta no válida");
    setUsuarios(data);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
  } finally {
    setLoading(false);
  }
}, [token]);



  useEffect(() => {
    fetchUsuarios();
  }, [fetchUsuarios]);

  const cambiarRol = async (id, nuevoRol) => {
    try {
      await fetch(`http://localhost:3001/api/usuarios/${id}/rol`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rol: nuevoRol }),
      });
      fetchUsuarios();
    } catch (error) {
      console.error("Error al cambiar rol:", error);
    }
  };

  // Abrir diálogo de confirmación
  const openConfirm = (id, activoActual) => {
    setConfirmDialog({
      open: true,
      usuarioId: id,
      nuevoEstado: !activoActual,
    });
  };

  // Confirmar activación/desactivación
  const handleConfirm = async () => {
    const { usuarioId } = confirmDialog;
    setConfirmDialog({ open: false, usuarioId: null, nuevoEstado: true });

    try {
      await fetch(`http://localhost:3001/usuarios/${usuarioId}`, {
  method: "DELETE",
  headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsuarios();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Container sx={{ mt: 8, mb: 6, maxWidth: "1200px", mx: "auto", p: 6, borderRadius: 4, background: "rgba(255,255,255,0.85)", backdropFilter: "blur(14px)", boxShadow: 4 }}>
        <Typography variant="h4" sx={{ fontFamily: "Playfair Display", textAlign: "center", mb: 4, fontWeight: "bold" }}>
          Gestión de Usuarios
        </Typography>

        {loading ? (
          <Typography>Cargando usuarios...</Typography>
        ) : (
          <Paper sx={{ overflowX: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Nombre</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Rol</strong></TableCell>
                  <TableCell><strong>Activo</strong></TableCell>
                  <TableCell><strong>Permisos</strong></TableCell>
                  <TableCell><strong>Acciones</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usuarios.map((u) => {
                  const esRoot = u.email === "admin@saboresurbanos.com";
                  return (
                    <TableRow key={u._id}>
                      <TableCell>{u.nombre}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>
                        <FormControl fullWidth>
                          <Select
                            value={u.rol}
                            size="small"
                            disabled={esRoot}
                            onChange={(e) => cambiarRol(u._id, e.target.value)}
                          >
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="usuario">Usuario</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={u.activo}
                          onChange={() => openConfirm(u._id, u.activo)}
                          disabled={esRoot}
                        />
                      </TableCell>
                      <TableCell>
                        {u.permisos?.puedeEditarPlatos ? "Puede editar" : "No puede editar"}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Editar permisos">
                          <span>
                            <IconButton
                              color="primary"
                              onClick={() => alert("Función de editar permisos en desarrollo")}
                              disabled={esRoot}
                            >
                              <EditIcon />
                            </IconButton>
                          </span>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        )}

        <Box mt={4} textAlign="center">
          <Button variant="contained" onClick={() => setModalAbierto(true)}>
            Crear nuevo usuario
          </Button>
        </Box>

        <CrearUsuarioModal
          open={modalAbierto}
          onClose={() => setModalAbierto(false)}
          onUsuarioCreado={fetchUsuarios}
        />
      </Container>

      {/* Diálogo de confirmación */}
      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog((prev) => ({ ...prev, open: false }))}
      >
        <DialogTitle>
          {confirmDialog.nuevoEstado ? "¿Activar usuario?" : "¿Desactivar usuario?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmDialog((prev) => ({ ...prev, open: false }))}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm} color="error">
            {confirmDialog.nuevoEstado ? "Activar" : "Desactivar"}
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </>
  );
};

export default GestionUsuarios;
