import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Stack,
  Paper,
  Snackbar,
  Alert
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const Contacto = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleEnviar = () => {
    // Simular envío
    setOpenSnackbar(true);
    setNombre('');
    setEmail('');
    setMensaje('');
  };

  return (
    <Container sx={{ my: 6 }}>
      <Typography variant="h4" gutterBottom>
        📬 Contacto
      </Typography>

      <Stack spacing={2} sx={{ mb: 4 }}>
        <Box display="flex" alignItems="center" gap={1}>
          <LocationOnIcon />
          <Typography>Lima 717, CABA</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <PhoneIcon />
          <Typography>(011) 9999-9999</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <EmailIcon />
          <Typography>info@saboresurbanos.com</Typography>
        </Box>
      </Stack>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Envíanos tu mensaje
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Nombre"
            fullWidth
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Mensaje"
            fullWidth
            multiline
            rows={4}
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={handleEnviar}
            disabled={!nombre || !email || !mensaje}
          >
            Enviar
          </Button>
        </Stack>
      </Paper>

      {/* ✅ Cartel de confirmación */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity="success"
          onClose={() => setOpenSnackbar(false)}
          variant="filled"
        >
          ✅ Mensaje enviado. Le responderemos dentro de las próximas 24 hs. ¡Gracias!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Contacto;
