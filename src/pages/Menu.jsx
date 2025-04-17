import React, { useEffect, useState } from 'react';
import { Container, Typography, Fab } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import menuData from '../data/menuData';
import MenuCategory from '../components/menu/MenuCategory';

const Menu = () => {
  const [visible, setVisible] = useState(false);

  // Mostrar el botón solo si se scrolleó hacia abajo
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para volver arriba
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        🍽️ Carta
      </Typography>
      {menuData.map((categoria, index) => (
        <MenuCategory key={index} {...categoria} />
      ))}

      {/* Botón flotante */}
      {visible && (
        <Fab
          color="primary"
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 1000,
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      )}
    </Container>
  );
};

export default Menu;
