import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useState, useEffect } from "react";
import { axiosPrivado } from "../../utils/axios";

const CambiarPasswordModal = ({ open, onClose, usuario, logout, navigate }) => {
  const [nueva, setNueva] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  useEffect(() => {
    if (!open) {
      setNueva("");
      setConfirmar("");
      setError("");
      setExito("");
    }
  }, [open]);

  const handleSubmit = async () => {
    setError("");
    setExito("");

    if (nueva.length < 6) return setError("La contraseña debe tener al menos 6 caracteres");
    if (nueva !== confirmar) return setError("Las contraseñas no coinciden");

    try {
      await axiosPrivado(usuario.token).put(`/usuarios/${usuario.id}/password`, {
        nuevaContraseña: nueva,
      });

      setExito("Contraseña actualizada correctamente.");
      setTimeout(() => {
        onClose();
        logout();
        navigate("/login");
      }, 2500);
    } catch (err) {
      setError(err.response?.data?.error || "Error al actualizar la contraseña");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Cambiar Contraseña</DialogTitle>

      <DialogContent
        dividers
        sx={{
          maxHeight: { xs: "70vh", sm: "none" },
          overflowY: { xs: "auto", sm: "visible" },
        }}
      >
        <TextField
          label="Nueva contraseña"
          type="password"
          fullWidth
          margin="normal"
          value={nueva}
          onChange={(e) => setNueva(e.target.value)}
        />
        <TextField
          label="Confirmar contraseña"
          type="password"
          fullWidth
          margin="normal"
          value={confirmar}
          onChange={(e) => setConfirmar(e.target.value)}
        />

        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {exito && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {exito} <br />
            <strong>Será redirigido al login para aplicar los cambios.</strong>
          </Alert>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CambiarPasswordModal;
