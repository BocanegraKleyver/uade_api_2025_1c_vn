import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Rating,
  Button,
  Stack,
  Chip,
  Container,
  Card,
  Fab,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import usePlatos from '../hooks/usePlatos';
import Footer from '../components/layout/Footer';

const Platos = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [copiadoId, setCopiadoId] = useState(null);
  const { platos, cargando, error } = usePlatos();

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  if (cargando) return <Typography>Cargando platos...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <>
      <Container sx={{ py: 5 }}>
        <Typography variant="h4" gutterBottom>
          Todos los Platos
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate('/')}
          sx={{
            mb: 4,
            backgroundColor: '#1976d2',
            color: '#fff',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#115293',
            },
          }}
        >
          ⬅ Volver al Menú Principal
        </Button>

        <Box display="flex" flexDirection="column" gap={4}>
          {platos.map((plato, index) => {
            const imagen = plato.imagen
  ? `${process.env.REACT_APP_API_URL}/uploads/${plato.imagen}`
  : 'https://via.placeholder.com/400x240?text=Sin+imagen';

            const { promedio, cantidad } = obtenerPromedioYCantidad(plato.nombre);

            return (
              <motion.div
                key={plato._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
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
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.02)',
                    },
                  }}
                >
                  {copiadoId === plato._id && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        backgroundColor: '#4caf50',
                        color: '#fff',
                        fontWeight: 'bold',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        boxShadow: 3,
                        fontSize: '0.85rem',
                        zIndex: 10,
                      }}
                    >
                      ✅ Copiado al portapapeles
                    </Box>
                  )}

                  {promedio > 0 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        backgroundColor: 'rgba(10, 10, 10, 0.6)',
                        borderRadius: '8px',
                        px: 1.5,
                        py: 0.5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Rating value={promedio} precision={0.5} readOnly size="small" />
                      <Typography variant="caption" sx={{ color: '#fff' }}>
                        ({cantidad} reseña{cantidad > 1 ? 's' : ''})
                      </Typography>
                    </Box>
                  )}

                  <Box
                    sx={{
                      width: '100%',
                      backdropFilter: 'blur(6px)',
                      background: 'rgba(0, 0, 0, 0.4)',
                      padding: 2,
                    }}
                  >
                    <Typography variant="h6">{plato.nombre}</Typography>
                    <Typography variant="body2">${plato.precio}</Typography>

                    {plato.etiquetas?.length > 0 && (
                      <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
                        {plato.etiquetas.map((et, i) => (
                          <Chip
                            key={i}
                            size="small"
                            label={et}
                            sx={{
                              bgcolor: 'rgba(255, 255, 255, 0.85)',
                              color: '#333',
                              fontWeight: 'bold',
                            }}
                          />
                        ))}
                      </Stack>
                    )}
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
          })}
        </Box>

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

      <Footer />
    </>
  );
};

export default Platos;
