import React, { useEffect, useRef, useState } from 'react';
import {
  Container, Typography, Fab, Box, Button, TextField, CircularProgress, Card, Rating,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import MenuCategory from '../components/menu/MenuCategory';
import Footer from '../components/layout/Footer';
import fondoHero from '../assets/fondo-hero.jpg';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import usePlatos from '../hooks/usePlatos';

const Menu = () => {
  const { platos, cargando, error } = usePlatos();
  const [visible, setVisible] = useState(false);
  const cartaRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [inputBusqueda, setInputBusqueda] = useState(initialQuery);
  const [busqueda, setBusqueda] = useState(initialQuery);
  const [copiadoId, setCopiadoId] = useState(null);

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

  const obtenerPromedioYCantidad = (nombrePlato) => {
    const key = `reseñas_${nombrePlato}`;
    const guardadas = localStorage.getItem(key);
    if (!guardadas) return { promedio: 0, cantidad: 0 };
    const lista = JSON.parse(guardadas);
    const total = lista.reduce((acc, r) => acc + r.valoracion, 0);
    return {
      promedio: lista.length ? total / lista.length : 0,
      cantidad: lista.length,
    };
  };

  const categoriasFiltradas = platos
    .map((p) => p.categoria)
    .filter((v, i, arr) => arr.indexOf(v) === i)
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
                '&:hover': { transform: 'scale(1.05)', boxShadow: 6 },
              }}
            >
              Ver Carta
            </Button>
          </motion.div>
        </Box>
      </Box>

      <Container ref={cartaRef} sx={{
        background: 'rgba(255, 255, 255, 0.85)',
        borderRadius: 3,
        padding: 4,
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

        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              setBusqueda(inputBusqueda);
              setSearchParams(inputBusqueda ? { q: inputBusqueda } : {});
            }}
            sx={{ fontFamily: 'Playfair Display', backgroundColor: '#1976d2', color: '#fff', fontWeight: 'bold' }}
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

        {busqueda ? (
          platos
            .filter((plato) =>
              plato.nombre.toLowerCase().includes(busqueda.toLowerCase())
            )
            .map((plato, index) => {
              const imagen = plato.imagen
  ? `${process.env.REACT_APP_API_URL}/uploads/${plato.imagen}`
  : 'https://via.placeholder.com/400x240?text=Sin+imagen';

              const { promedio, cantidad } = obtenerPromedioYCantidad(plato.nombre);

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  style={{ marginBottom: '20px' }}
                >
                  <Card
                    onClick={() => navigate(`/plato/${plato._id}`)}

                    sx={{
                      height: 240,
                      position: 'relative',
                      color: 'white',
                      backgroundImage: `url(${imagen})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'flex-end',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: 5,
                      '&:hover': { transform: 'scale(1.02)' },
                    }}
                  >
                    {copiadoId === plato._id && (
                      <Box sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        backgroundColor: '#4caf50',
                        color: '#fff',
                        fontWeight: 'bold',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        zIndex: 10,
                      }}>
                        ✅ Copiado al portapapeles
                      </Box>
                    )}

                    {promedio > 0 && (
                      <Box sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        backgroundColor: 'rgba(10, 10, 10, 0.6)',
                        borderRadius: '8px',
                        px: 1.5,
                        py: 0.5,
                      }}>
                        <Rating value={promedio} precision={0.5} readOnly size="small" />
                        <Typography variant="caption" sx={{ color: '#fff' }}>
                          ({cantidad} reseña{cantidad > 1 ? 's' : ''})
                        </Typography>
                      </Box>
                    )}

                    <Box sx={{
                      width: '100%',
                      backdropFilter: 'blur(6px)',
                      background: 'rgba(0, 0, 0, 0.4)',
                      padding: 2,
                    }}>
                      <Typography variant="h6">{plato.nombre}</Typography>
                      <Typography variant="body2">${plato.precio}</Typography>
                    </Box>

                    <Box sx={{ position: 'absolute', bottom: 8, right: 8 }}>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          fontFamily: 'Playfair Display',
                          backgroundColor: '#1976d2',
                          color: '#fff',
                          fontWeight: 'bold',
                          textTransform: 'none',
                          fontSize: '0.85rem',
                          '&:hover': {
                            backgroundColor: '#115293',
                          },
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          const url = `${window.location.origin}/plato/${plato._id}`;

                          navigator.clipboard.writeText(url);
                          setCopiadoId(plato._id);

                          setTimeout(() => setCopiadoId(null), 2000);
                        }}
                      >
                        Compartir
                      </Button>
                    </Box>
                  </Card>
                </motion.div>
              );
            })
        ) : (
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
        )}

        {categoriasFiltradas.length === 0 && (
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

      <Footer />
    </>
  );
};

export default Menu;
