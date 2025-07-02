import React from 'react';
import { Box, Typography, Button, useMediaQuery } from '@mui/material';
import { keyframes } from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import fondoHero from '../../assets/fondo-hero.jpg';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Hero = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const scrollToMenu = () => {
    const seccionCarta = document.getElementById('carta');
    if (seccionCarta) {
      seccionCarta.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundImage: `url(${fondoHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: '#fff',
        px: 2,
        py: 4,
      }}
    >
      <Typography
        variant="h2"
        sx={{
          animation: `${fadeIn} 1.5s ease-out forwards`,
          fontWeight: 'bold',
          textShadow: '2px 2px 10px rgba(0,0,0,0.7)',
          mb: 4,
          fontSize: { xs: '2.2rem', sm: '3rem', md: '4rem' },
        }}
      >
        Sabores Urbanos
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={scrollToMenu}
        sx={{
          fontSize: { xs: '0.9rem', sm: '1.1rem' },
          px: 4,
          py: 1.5,
          backgroundColor: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(6px)',
          border: '1px solid white',
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.25)',
          },
        }}
      >
        Ver Carta
      </Button>
    </Box>
  );
};

export default Hero;
