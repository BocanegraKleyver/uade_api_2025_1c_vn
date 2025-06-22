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
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import EditIcon from "@mui/icons-material/Edit";
import Footer from "../components/layout/Footer";

const GestionUsuarios = () => {
  const { token } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

/*  const fetchUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/usuarios", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    } finally {
      setLoading(false);
    }
  };*/


const fetchUsuarios = useCallback(async () => {
  try {
    const res = await fetch("http://localhost:3001/api/usuarios", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log("Respuesta /api/usuarios:", data);

    if (!Array.isArray(data)) throw new Error("Respuesta no válida");
    setUsuarios(data);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
  } finally {
    setLoading(false);
  }
}, [token]); // <- dependencia correcta

useEffect(() => {
  fetchUsuarios();
}, [fetchUsuarios]); // <- ahora no hay warning



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

  const toggleActivo = async (id, nuevoEstado) => {
    try {
      if (!nuevoEstado) {
        await fetch(`http://localhost:3001/api/usuarios/${id}/desactivar`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchUsuarios();
      }
    } catch (error) {
      console.error("Error al cambiar estado:", error);
    }
  };

  return (
    <>
      <Container
        sx={{
          mt: 8,
          mb: 6,
          maxWidth: "1200px",
          mx: "auto",
          padding: 6,
          borderRadius: 4,
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(14px)",
          boxShadow: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Playfair Display",
            textAlign: "center",
            mb: 4,
            fontWeight: "bold",
          }}
        >
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
    const esRoot = u.email === "admin@saboresurbanos.com"; // Protección

    return (
      <TableRow key={u._id}>
        <TableCell>{u.nombre}</TableCell>
        <TableCell>{u.email}</TableCell>

        {/* Solo se permite cambiar rol si NO es el root */}
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

        {/* Switch activo permite activar/desactivar, salvo si es el root */}
        <TableCell>
          <Switch
            checked={u.activo}
            onChange={(e) => toggleActivo(u._id, e.target.checked)}
            disabled={esRoot}
          />
        </TableCell>

        {/* Permisos (no editable por ahora) */}
        <TableCell>
          {u.permisos?.puedeEditarPlatos ? "Puede editar" : "No puede"}
        </TableCell>

        {/* Botón editar permisos (deshabilitado para root) */}
        <TableCell>
          <Tooltip title="Editar permisos">
            <span>
              <IconButton
                color="primary"
                onClick={() =>
                  alert("Función de editar permisos en desarrollo")
                }
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
          <Button
            variant="contained"
            onClick={() => alert("Función de crear usuario en desarrollo")}
          >
            Crear nuevo usuario
          </Button>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default GestionUsuarios;
