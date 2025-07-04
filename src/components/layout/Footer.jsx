import React from 'react';
import {
  Box,
  Typography,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import qrSaboresUrbanos from '../../assets/QR-Sabores_Urbanos.png';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <>
      {/* Gradiente superior */}
      <Box sx={{ height: '4px', background: 'linear-gradient(to right, #ff5722, #ffc107)', width: '100%' }} />
  
      {/* Contenido principal del footer */}
      <Box
        sx={{
          backgroundColor: '#2c2c2c',
          color: 'white',
          textAlign: 'center',
          py: { xs: 4, md: 6 },
          px: 2,
        }}
      >
        <Box
          sx={{
            maxWidth: '1200px',
            mx: 'auto',
            px: { xs: 2, md: 6 },
          }}
        >
          {/* Título principal */}
          <Typography
            variant={isMobile ? 'h5' : 'h3'}
            sx={{
              fontFamily: 'Playfair Display',
              fontWeight: 'bold',
              mb: 4,
              textAlign: 'center',
            }}
          >
            Sabores Urbanos
          </Typography>
  
          {/* Secciones del footer */}
          <Stack
                direction={isMobile ? 'column' : 'row'}
                justifyContent="space-between"
                alignItems="center"
                spacing={6}
                sx={{
                  flexWrap: 'wrap',
                  mb: 4,
                  width: '100%',
                  textAlign: isMobile ? 'center' : 'left',
                }}
              >
                {/* Contacto */}
                <Stack
                  spacing={2}
                  sx={{
                    flex: 1,
                    minWidth: 240,
                    minHeight: { md: 250 },
                    alignItems: isMobile ? 'center' : 'flex-start',
                    textAlign: isMobile ? 'center' : 'left',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontFamily: 'Noto Znamenny Musical Notation', fontWeight: 'bold' }}
                  >
                    Contacto
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <PhoneIcon fontSize="small" />
                    <Typography variant="body2">(011) 9999-9999</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <EmailIcon fontSize="small" />
                    <Typography variant="body2">admin@saboresurbanos.com</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <LocationOnIcon fontSize="small" />
                    <Typography variant="body2">Lima 717, CABA</Typography>
                  </Box>
                </Stack>

                {/* Acceso Rápido */}
                <Stack
                  spacing={1.5}
                  sx={{
                    flex: 1,
                    minWidth: 240,
                    maxWidth: 300,
                    minHeight: { md: 250 },
                    alignItems: isMobile ? 'center' : 'flex-start',
                    textAlign: isMobile ? 'center' : 'left',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontFamily: 'Noto Znamenny Musical Notation', fontWeight: 'bold' }}
                  >
                    Acceso Rápido
                  </Typography>
                  <Typography variant="body2">
                    Escaneá para acceder desde tu celular:
                  </Typography>
                  <Box
                    component="img"
                    src={qrSaboresUrbanos}
                    alt="QR Sabores Urbanos"
                    sx={{ width: 120, height: 120 }}
                  />
                </Stack>

                {/* Ubicación */}
                <Stack
                  spacing={1.5}
                  sx={{
                    flex: 1,
                    minWidth: 240,
                    maxWidth: 350,
                    minHeight: { md: 250 },
                    alignItems: isMobile ? 'center' : 'flex-start',
                    textAlign: isMobile ? 'center' : 'left',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontFamily: 'Noto Znamenny Musical Notation', fontWeight: 'bold' }}
                  >
                    Ubicación
                  </Typography>
                  <Box sx={{ width: '100%'}}>
                    <iframe
                      title="Mapa Sabores Urbanos"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13129.753073370612!2d-58.38624895!3d-34.61681625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccac9f09a1cb3%3A0x62e234c2de8b0d5a!2sUADE!5e0!3m2!1ses-419!2sar!4v1689373330000!5m2!1ses-419!2sar"
                      width="100%"
                      height="175"
                      style={{ border: 0, borderRadius: '10px' }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </Box>
                </Stack>
              </Stack>
          {/* Copyright */}
          <Typography variant="caption" sx={{ textAlign: 'center', display: 'block' }}>
            © {new Date().getFullYear()} Sabores Urbanos. Todos los derechos reservados.
          </Typography>
        </Box>
      </Box>
  
      {/* Gradiente inferior */}
      <Box sx={{ height: '4px', background: 'linear-gradient(to right, #ff5722, #ffc107)', width: '100%' }} />
    </>
  );
};

export default Footer;
