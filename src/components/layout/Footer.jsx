import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import qrSaboresUrbanos from '../../assets/QR-Sabores_Urbanos.png'

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#2c2c2c',
        color: 'white',
        textAlign: 'center',
        paddingY: 4,
        mt: 6,
      }}
    >

      <Typography variant="h6" sx={{ mb: 2 }}>
        Sabores Urbanos
      </Typography>

      <Stack direction="column" spacing={1} sx={{ alignItems: 'center', mb: 2 }}>
        <Box display="flex" alignItems="center" gap={1}>
          <LocationOnIcon fontSize="small" />
          <Typography variant="body2">Lima 717, CABA</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <PhoneIcon fontSize="small" />
          <Typography variant="body2">(011) 9999-9999</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <EmailIcon fontSize="small" />
          <Typography variant="body2">info@saboresurbanos.com</Typography>
        </Box>
      </Stack>

      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          También podés acceder a esta carta desde tu celular escaneando el QR:
        </Typography>
        <Box
          component="img"
          src={qrSaboresUrbanos}
          alt="QR Sabores Urbanos"
          sx={{ width: 120, height: 120, mx: 'auto' }}
        />
      </Box>

      <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mb: 3 }}>
        <iframe
          title="Mapa UADE"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13129.753073370612!2d-58.38624895!3d-34.61681625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccac9f09a1cb3%3A0x62e234c2de8b0d5a!2sUADE!5e0!3m2!1ses-419!2sar!4v1689373330000!5m2!1ses-419!2sar"
          width="100%"
          height="200"
          style={{ border: 0, borderRadius: '10px' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </Box>

      <Typography variant="caption">
        © {new Date().getFullYear()} Sabores Urbanos. Todos los derechos reservados.
      </Typography>
    </Box>
  );
};

export default Footer;
