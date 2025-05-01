import React from 'react';
import {Typography,Box,Rating,Button,Stack,Chip,Container,Card,Fab,} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import menuData from '../data/menuData';

import empanadassaltenas from '../assets/platos/empanadassaltenas.jpg';
import provoleta from '../assets/platos/provoleta.jpg';
import chorizoalaparrilla from '../assets/platos/chorizoalaparrilla.jpg';
import bruschettamediterranea from '../assets/platos/bruschettamediterranea.jpg';
import ensaladacesar from '../assets/platos/ensaladacesar.jpg';
import ensaladaveggie from '../assets/platos/ensaladaveggie.jpg';
import ensaladaburrata from '../assets/platos/ensaladaburrata.jpg';
import bifedechorizo from '../assets/platos/bifedechorizo.jpg';
import asadocriollo from '../assets/platos/asadocriollo.jpg';
import bondiolabraseada from '../assets/platos/bondiolabraseada.jpg';
import supremanapolitana from '../assets/platos/supremanapolitana.jpg';
import polloalverdeo from '../assets/platos/polloalverdeo.jpg';
import polloalaparrilla from '../assets/platos/polloalaparrilla.jpg';
import truchapatagonica from '../assets/platos/truchapatagonica.jpg';
import merluzaallimon from '../assets/platos/merluzaallimon.jpg';
import noquisconsalsabolognesa from '../assets/platos/noquisconsalsabolognesa.jpg';
import raviolesdeverdura from '../assets/platos/raviolesdeverdura.jpg';
import lasagnaveggie from '../assets/platos/lasagnaveggie.jpg';
import flancasero from '../assets/platos/flancasero.jpg';
import volcandechocolate from '../assets/platos/volcandechocolate.jpg';
import cheesecake from '../assets/platos/cheesecake.jpg';
import alfajores from '../assets/platos/alfajores.jpg';
import vinomalbec from '../assets/platos/vinomalbec.jpg';
import cervezaartesanal from '../assets/platos/cervezaartesanal.jpg';
import fernetconcoca from '../assets/platos/fernetconcoca.jpg';
import aguasaborizada from '../assets/platos/aguasaborizada.jpg';
import gaseosacocacola from '../assets/platos/gaseosacocacola.jpg';
import limonadacasera from '../assets/platos/limonadacasera.jpg';
import aguamineralcongas from '../assets/platos/aguamineralcongas.jpg';
import aguamineralsingas from '../assets/platos/aguamineralsingas.jpg';
import tiramisu from '../assets/platos/tiramisu.jpg';

const imagenes = {
  empanadassaltenas,
  provoleta,
  chorizoalaparrilla,
  bruschettamediterranea,
  ensaladacesar,
  ensaladaveggie,
  ensaladaburrata,
  bifedechorizo,
  asadocriollo,
  bondiolabraseada,
  supremanapolitana,
  polloalverdeo,
  polloalaparrilla,
  truchapatagonica,
  merluzaallimon,
  noquisconsalsabolognesa,
  raviolesdeverdura,
  lasagnaveggie,
  flancasero,
  volcandechocolate,
  cheesecake,
  alfajores,
  vinomalbec,
  cervezaartesanal,
  fernetconcoca,
  aguasaborizada,
  gaseosacocacola,
  limonadacasera,
  aguamineralcongas,
  aguamineralsingas,
  tiramisu,
};

const normalizarNombre = (str) =>
  str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ñ/g, 'n')
    .replace(/-/g, '')
    .replace(/\s+/g, '');

const Platos = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = React.useState(false);
  const [copiadoId, setCopiadoId] = React.useState(null);

  React.useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const todosLosPlatos = menuData.flatMap((categoria) => categoria.platos);

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

  return (
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
        {todosLosPlatos.map((plato, index) => {
          const nombreFormateado = normalizarNombre(plato.nombre);
          const imagen = imagenes[nombreFormateado];
          const { promedio, cantidad } = obtenerPromedioYCantidad(plato.nombre);

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card
                onClick={() => navigate(`/plato/${plato.id}`)}
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
                {copiadoId === plato.id && (
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
                      fontFamily: 'Noto Znamenny Musical Notation',
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

                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                  }}
                >
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      color: '#000',
                      fontWeight: 'bold',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,1)',
                      },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      const url = `${window.location.origin}/plato/${plato.id}`;
                      navigator.clipboard.writeText(url);
                      setCopiadoId(plato.id);
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
  );
};

export default Platos;
