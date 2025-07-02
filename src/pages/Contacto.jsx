import React, { useState } from 'react';
import {
  Container, Typography, TextField, Button, Box, Stack, Paper,
  Snackbar, Alert, useMediaQuery, useTheme
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { useNavigate } from 'react-router-dom';

const Contacto = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errores, setErrores] = useState({ nombre: false, email: false, mensaje: false });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
        maxWidth="md"
        sx={{
          my: 6,
          background: 'rgba(255,255,255,0.85)',
          borderRadius: 3,
          p: { xs: 3, md: 5 },
          pb: 8,
          backdropFilter: 'blur(10px)',
          boxShadow: 4,
        }}
      >
        <Typography
          variant={isMobile ? 'h4' : 'h3'}
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
          <Stack direction="row" spacing={1} alignItems="center">
            <LocationOnIcon />
            <Typography noWrap sx={{ fontFamily: 'Noto Znamenny Musical Notation' }}>
              Lima 717, CABA
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <PhoneIcon />
            <Typography noWrap sx={{ fontFamily: 'Noto Znamenny Musical Notation' }}>
              (011) 9999-9999
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <EmailIcon />
            <Typography noWrap sx={{ fontFamily: 'Noto Znamenny Musical Notation' }}>
              admin@saboresurbanos.com
            </Typography>
          </Stack>
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

        <Box mt={4} textAlign="center">
          <Button
            variant="contained"
            onClick={() => navigate('/')}
            sx={{
              fontWeight: 'bold',
              px: 4,
              py: 1.5,
            }}
          >
            ⬅ Volver al Menú Principal
          </Button>
        </Box>
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

      
    </>
  );
};

export default Contacto;
