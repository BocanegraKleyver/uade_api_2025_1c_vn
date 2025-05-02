import React, { useState } from 'react';
import {Container, Typography, TextField, Button, Box, Stack, Paper, Snackbar, Alert} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/layout/Footer';

const Contacto = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errores, setErrores] = useState({ nombre: false, email: false, mensaje: false });
  const navigate = useNavigate();

  const validarEmail = (correo) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim());

  const handleEnviar = () => {
    const nuevoErrores = {
      nombre: !nombre.trim(),
      email: !validarEmail(email),
      mensaje: !mensaje.trim()
    };
    setErrores(nuevoErrores);

    const hayError = Object.values(nuevoErrores).some((e) => e === true);
    if (hayError) return;

    setOpenSnackbar(true);
    setNombre('');
    setEmail('');
    setMensaje('');
    setErrores({ nombre: false, email: false, mensaje: false });
  };

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          my: 6,
          background: 'rgba(255,255,255,0.85)',
          borderRadius: 3,
          padding: 4,
          pb: 8,
          backdropFilter: 'blur(10px)',
          boxShadow: 4,
          mx: 'auto',
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontFamily: 'Playfair Display',
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 4
          }}
        >
          Contacto
        </Typography>

        <Stack spacing={2} sx={{ mb: 4 }}>
          <Box display="flex" alignItems="center" gap={1}>
            <LocationOnIcon />
            <Typography sx={{ fontFamily: 'Noto Znamenny Musical Notation' }}>
              Lima 717, CABA
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <PhoneIcon />
            <Typography sx={{ fontFamily: 'Noto Znamenny Musical Notation' }}>
              (011) 9999-9999
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <EmailIcon />
            <Typography sx={{ fontFamily: 'Noto Znamenny Musical Notation' }}>
              info@saboresurbanos.com
            </Typography>
          </Box>
        </Stack>

        <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, borderRadius: 2 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontFamily: 'Playfair Display', fontWeight: 'bold' }}
          >
            Envíanos tu mensaje
          </Typography>

          <Stack spacing={3}>
            <TextField
              label="Nombre"
              fullWidth
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              error={errores.nombre}
              helperText={errores.nombre && 'Por favor ingresá tu nombre'}
              inputProps={{ style: { fontFamily: 'Noto Znamenny Musical Notation' } }}
            />
            <TextField
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errores.email}
              helperText={errores.email && 'Ingresá un email válido'}
              inputProps={{ style: { fontFamily: 'Noto Znamenny Musical Notation' } }}
            />
            <TextField
              label="Mensaje"
              fullWidth
              multiline
              rows={4}
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              error={errores.mensaje}
              helperText={errores.mensaje && 'Escribí un mensaje'}
              inputProps={{ style: { fontFamily: 'Noto Znamenny Musical Notation' } }}
            />
            <Button
              variant="contained"
              onClick={handleEnviar}
              sx={{ fontWeight: 'bold' }}
            >
              Enviar
            </Button>
          </Stack>
        </Paper>

        <Button
          sx={{ mt: 3 }}
          variant="contained"
          onClick={() => navigate('/')}
        >
          ⬅ Volver al Menú Principal
        </Button>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        style={{ zIndex: 1300 }}
      >
        <Alert
          severity="success"
          onClose={() => setOpenSnackbar(false)}
          variant="filled"
          sx={{ fontWeight: 'bold', fontFamily: 'Noto Znamenny Musical Notation' }}
        >
          ✅ Mensaje enviado. Le responderemos dentro de las próximas 24 hs. ¡Gracias!
        </Alert>
      </Snackbar>

      <Footer />
    </>
  );
};

export default Contacto;
