import React, { useEffect, useRef, useState } from 'react';
import {Container,Typography,Fab,Box,Button,TextField,} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import menuData from '../data/menuData';
import MenuCategory from '../components/menu/MenuCategory';
import Footer from '../components/layout/Footer';
import fondoHero from '../assets/fondo-hero.jpg';
import '@fontsource/playfair-display';
import { motion } from 'framer-motion';

const Menu = () => {
  const [visible, setVisible] = useState(false);
  const cartaRef = useRef(null);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCarta = () => {
    cartaRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categoriasFiltradas = menuData
    .map((cat) => ({
      ...cat,
      platos: cat.platos.filter((p) =>
        p.nombre.toLowerCase().includes(busqueda.toLowerCase())
      ),
    }))
    .filter((cat) => cat.platos.length > 0);

  return (
    <>
      {/* Hero con fondo y botón */}
      <Box
        sx={{
          minHeight: '100vh',
          backgroundImage: `url(${fondoHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Overlay oscuro */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'brightness(1.3)',
            zIndex: 1,
          }}
        />
        <Box sx={{ zIndex: 2, textAlign: 'center', color: 'white' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h2"
              sx={{
                mb: 3,
                textShadow: '2px 2px 8px black',
                fontFamily: 'Playfair Display',
              }}
            >
              Sabores Urbanos
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Button
              variant="contained"
              size="large"
              endIcon={<RestaurantMenuIcon />}
              onClick={scrollToCarta}
              sx={{
                fontSize: '1.1rem',
                paddingX: 4,
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 6,
                },
              }}
            >
              Ver Carta
            </Button>
          </motion.div>
        </Box>
      </Box>

      {/* Carta */}
      <Container
        ref={cartaRef}
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
          📖 Menú digital
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          Explorá nuestra selección de platos divididos en categorías. ¡Hacé clic para ver más detalles y dejar tu reseña!
        </Typography>

        <TextField
          label="Buscar plato..."
          variant="outlined"
          fullWidth
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          sx={{ mb: 4 }}
        />

        {categoriasFiltradas.map((categoria, index) => (
          <MenuCategory key={index} {...categoria} />
        ))}

        {categoriasFiltradas.length === 0 && (
          <Typography variant="body1">
            No se encontraron platos con "{busqueda}"
          </Typography>
        )}
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

      <Footer />
    </>
  );
};

export default Menu;
