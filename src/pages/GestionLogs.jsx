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
  TextField,
  Stack,
  Button,
  TableContainer,
  Snackbar,
  Alert,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const GestionLogs = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [logs, setLogs] = useState([]);
  const [email, setEmail] = useState("");
  const [accion, setAccion] = useState("");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [mostrarScrollTop, setMostrarScrollTop] = useState(false);

  const fetchLogs = useCallback(async () => {
    try {
      let url = "http://localhost:3001/api/logs?";
      if (email) url += `email=${email}&`;
      if (accion) url += `accion=${accion}&`;
      if (desde && hasta) url += `desde=${desde}&hasta=${hasta}&`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setLogs(data);
    } catch (error) {
      console.error("Error al obtener logs:", error);
      setSnackbar({ open: true, message: "Error al obtener logs", severity: "error" });
    }
  }, [email, accion, desde, hasta, token]);

  useEffect(() => {
    fetchLogs();
    const handleScroll = () => setMostrarScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchLogs]);

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 6, sm: 10 } }}>
      <Paper sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          sx={{ mb: 2 }}
        >
          <Typography variant="h5" fontWeight="bold">
            Gestión de Logs
          </Typography>
          <Button variant="outlined" onClick={() => navigate("/admin")}>
            Volver al Panel
          </Button>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          useFlexGap
          sx={{ mb: 3 }}
        >
          <TextField
            label="Email"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="Acción"
            size="small"
            value={accion}
            onChange={(e) => setAccion(e.target.value)}
            fullWidth
          />
          <TextField
            label="Desde"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={desde}
            onChange={(e) => setDesde(e.target.value)}
            fullWidth
          />
          <TextField
            label="Hasta"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={hasta}
            onChange={(e) => setHasta(e.target.value)}
            fullWidth
          />
          <Button variant="contained" onClick={fetchLogs}>
            Aplicar filtros
          </Button>
        </Stack>

        <TableContainer sx={{ overflowX: "auto", maxHeight: "60vh" }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell>Acción</TableCell>
                <TableCell>Detalle</TableCell>
                <TableCell>Fecha</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log._id}>
                  <TableCell>{log.usuario.email}</TableCell>
                  <TableCell>{`${log.usuario.nombre} ${log.usuario.apellido}`}</TableCell>
                  <TableCell>{log.usuario.rol}</TableCell>
                  <TableCell>{log.accion}</TableCell>
                  <TableCell>{log.detalle}</TableCell>
                  <TableCell>{new Date(log.createdAt).toLocaleString("es-AR")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
        </Snackbar>
      </Paper>

      {mostrarScrollTop && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            zIndex: 1000,
            borderRadius: "50%",
            minWidth: 56,
            minHeight: 56,
            boxShadow: 4,
          }}
        >
          ↑
        </Button>
      )}
    </Container>
  );
};

export default GestionLogs;
