import React, { useEffect, useState } from 'react';
import { Container, Typography, Fab } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import menuData from '../data/menuData';
import MenuCategory from '../components/menu/MenuCategory';
import Footer from '../components/layout/Footer';

const Menu = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Carta */}
      <Container
        sx={{
          background: 'rgba(255, 255, 255, 0.85)',
          borderRadius: 3,
          padding: 4,
          backdropFilter: 'blur(10px)',
          color: 'black',
          boxShadow: 4,
          marginTop: 6,
          marginBottom: 6,
        }}
      >
        <Typography variant="h4" gutterBottom>
          🍽️ Carta
        </Typography>
        {menuData.map((categoria, index) => (
          <MenuCategory key={index} {...categoria} />
        ))}
      </Container>

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

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Menu;
