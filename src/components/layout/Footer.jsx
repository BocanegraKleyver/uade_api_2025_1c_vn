import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Stack,
  Divider
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => (
  <Box
    sx={{
      backgroundColor: '#1c1c1c',
      color: 'white',
      textAlign: 'center',
      py: 4,
      mt: 8,
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

    {/* Redes sociales */}
    <Box>
      <IconButton color="inherit" size="small">
        <FacebookIcon />
      </IconButton>
      <IconButton color="inherit" size="small">
        <InstagramIcon />
      </IconButton>
      <IconButton color="inherit" size="small">
        <TwitterIcon />
      </IconButton>
    </Box>

    {/* Mapa */}
    <Box sx={{ mt: 3 }}>
      <iframe
        title="Mapa UADE"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13129.753073370612!2d-58.38624895!3d-34.61681625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccac9f09a1cb3%3A0x62e234c2de8b0d5a!2sUADE!5e0!3m2!1ses-419!2sar!4v1689373330000!5m2!1ses-419!2sar"
        width="100%"
        height="180"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </Box>

    <Divider sx={{ mt: 3, mb: 1, bgcolor: '#444' }} />

    <Typography variant="caption">
      © {new Date().getFullYear()} Sabores Urbanos. Todos los derechos reservados.
    </Typography>
  </Box>
);

export default Footer;
