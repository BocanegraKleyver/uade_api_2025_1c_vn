import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box sx={{
    backgroundColor: '#2c2c2c',
    color: 'white',
    textAlign: 'center',
    paddingY: 3,
    marginTop: 6
  }}>
    <Typography variant="body1" fontWeight="bold">Sabores Urbanos</Typography>
    <Typography variant="body2">📍 Lima 717, CABA</Typography>
    <Typography variant="body2">📞 (011) 1111-1111</Typography>
    <Typography variant="body2">✉️ info@saboresurbanos.com</Typography>

    <Box sx={{ mt: 2 }}>
      <iframe
        title="Mapa UADE"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13129.753073370612!2d-58.38624895!3d-34.61681625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccac9f09a1cb3%3A0x62e234c2de8b0d5a!2sUADE!5e0!3m2!1ses-419!2sar!4v1689373330000!5m2!1ses-419!2sar"
        width="100%"
        height="200"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </Box>
  </Box>
);

export default Footer;
