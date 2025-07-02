import React, { useEffect, useRef, useState } from 'react';
import {
  Container, Typography, Fab, Box, Button, TextField, CircularProgress,
  useMediaQuery, useTheme
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import MenuCategory from '../components/menu/MenuCategory';
import fondoHero from '../assets/fondo-hero.jpg';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import usePlatos from '../hooks/usePlatos';

const Menu = () => {
  const { platos, cargando, error } = usePlatos();
  const [visible, setVisible] = useState(false);
  const cartaRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [inputBusqueda, setInputBusqueda] = useState(initialQuery);
  const [busqueda, setBusqueda] = useState(initialQuery);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (initialQuery) {
      setTimeout(() => {
        cartaRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  }, [initialQuery]);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCarta = () => cartaRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });


  const ordenCategorias = [
  "Entrantes",
  "Ensaladas",
  "Platos Principales - Carnes Rojas",
  "Platos Principales - Carnes Blancas",
  "Platos Principales - Pescados",
  "Pastas",
  "Postres",
  "Bebidas Alcohólicas",
  "Bebidas sin alcohol",
];

  const categoriasFiltradas = ordenCategorias
  .map((categoria) => ({
    categoria,
    platos: platos.filter(
      (p) =>
        p.categoria === categoria &&
        p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    ),
  }))
  .filter((cat) => cat.platos.length > 0);

  return (
    <>
      <Box
  sx={{
    height: '100vh',
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
        <Box sx={{ zIndex: 2, textAlign: 'center', color: 'white', px: 2 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant={isMobile ? 'h4' : 'h2'}
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
                '&:hover': { transform: 'scale(1.05)', boxShadow: 6 },
              }}
            >
              Ver Carta
            </Button>
          </motion.div>
        </Box>
      </Box>

      <Container ref={cartaRef} sx={{
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 3,
        padding: { xs: 2, md: 4 },
        backdropFilter: 'blur(10px)',
        color: 'black',
        boxShadow: 4,
        marginTop: 6,
        marginBottom: 6,
      }}>
        <Typography variant="h4" gutterBottom>📖 Menú digital</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Explorá nuestra selección de platos divididos en categorías. ¡Hacé clic para ver más detalles y dejar tu reseña!
        </Typography>

        <TextField
          label="Buscar plato..."
          variant="outlined"
          fullWidth
          value={inputBusqueda}
          onChange={(e) => setInputBusqueda(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          mb: 4,
        }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              setBusqueda(inputBusqueda);
              setSearchParams(inputBusqueda ? { q: inputBusqueda } : {});
            }}
            sx={{ fontFamily: 'Playfair Display', fontWeight: 'bold' }}
          >
            Buscar
          </Button>

          {inputBusqueda && (
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                setInputBusqueda('');
                setBusqueda('');
                setSearchParams({});
              }}
              sx={{ fontFamily: 'Playfair Display', backgroundColor: '#e53935', color: '#fff', fontWeight: 'bold' }}
            >
              Borrar
            </Button>
          )}
        </Box>

        {cargando && <CircularProgress />}
        {error && <Typography color="error">{error}</Typography>}

        {categoriasFiltradas.length > 0 ? (
          categoriasFiltradas.map((categoria, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <MenuCategory {...categoria} />
            </motion.div>
          ))
        ) : (
          <Typography variant="body1">
            No se encontraron platos con "{busqueda}"
          </Typography>
        )}
      </Container>

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

      
    </>
  );
};

export default Menu;
