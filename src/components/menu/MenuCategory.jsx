import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Card,
  Box,
  Rating,
  Chip,
  Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Imágenes actualizadas
import medialunas from '../../assets/platos/medialunas.jpg';
import asado from '../../assets/platos/asado.jpg';
import milanesa from '../../assets/platos/milanesa.jpg';
import alfajores from '../../assets/platos/alfajores.jpg';
import tostadasDDL from '../../assets/platos/tostadasDDL.jpg';
import fernetconcoca from '../../assets/platos/fernetconcoca.jpg';
import malbec from '../../assets/platos/malbec.jpg';

import omelettedeespinaca from '../../assets/platos/omelettedeespinaca.jpg';
import tostadoconjamónyqueso from '../../assets/platos/tostadoconjamónyqueso.jpg';
import ensaladacésar from '../../assets/platos/ensaladacésar.jpg';
import ensaladaveggie from '../../assets/platos/ensaladaveggie.jpg';
import ensaladaburrata from '../../assets/platos/ensaladaburrata.jpg';
import bifedechorizo from '../../assets/platos/bifedechorizo.jpg';
import bondiolaalacerveza from '../../assets/platos/bondiolaalacerveza.jpg';
import lasagnaveggie from '../../assets/platos/lasagnaveggie.jpg';
import pizzamargarita from '../../assets/platos/pizzamargarita.jpg';
import hamburguesacompleta from '../../assets/platos/hamburguesacompleta.jpg';
import hamburguesaveggie from '../../assets/platos/hamburguesaveggie.jpg';
import flancasero from '../../assets/platos/flancasero.jpg';
import volcándechocolate from '../../assets/platos/volcándechocolate.jpg';
import cheesecake from '../../assets/platos/cheesecake.jpg';
import cervezaipa from '../../assets/platos/cervezaipa.jpg';
import aguasaborizada from '../../assets/platos/aguasaborizada.jpg';

const imagenes = {
  medialunas,
  asado,
  milanesa,
  alfajores,
  tostadasddl: tostadasDDL,
  fernetconcoca,
  malbec,
  omelettedeespinaca,
  tostadoconjamónyqueso,
  ensaladacésar,
  ensaladaveggie,
  ensaladaburrata,
  bifedechorizo,
  bondiolaalacerveza,
  lasagnaveggie,
  pizzamargarita,
  hamburguesacompleta,
  hamburguesaveggie,
  flancasero,
  volcándechocolate,
  cheesecake,
  cervezaipa,
  aguasaborizada,
};

const getEtiquetaIcono = (etiqueta) => {
  switch (etiqueta) {
    case 'Picante': return '🌶️';
    case 'Vegano': return '🥬';
    case 'Sin lactosa': return '🥛';
    default: return '';
  }
};

const MenuCategory = ({ categoria, platos }) => {
  const navigate = useNavigate();

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
    <Accordion disableGutters>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">{categoria}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box display="flex" flexDirection="column" gap={2}>
          {platos.map((plato, index) => {
            const nombreFormateado = plato.nombre.toLowerCase().replace(/\s+/g, '');
            const imagen = imagenes[nombreFormateado] || null;
            const { promedio, cantidad } = obtenerPromedioYCantidad(plato.nombre);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  onClick={() =>
                    navigate(`/plato/${plato.nombre.toLowerCase().replace(/\s+/g, '-')}`)
                  }
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
                  {promedio > 0 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        borderRadius: '8px',
                        px: 1.5,
                        py: 0.5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Rating
                        value={promedio}
                        precision={0.5}
                        readOnly
                        size="small"
                      />
                      <Typography variant="caption" sx={{ color: '#fff' }}>
                        ({cantidad} reseña{cantidad > 1 ? 's' : ''})
                      </Typography>
                    </Box>
                  )}

                  <Box
                    sx={{
                      width: '100%',
                      backdropFilter: 'blur(6px)',
                      background: 'rgba(0,0,0,0.4)',
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
                            label={`${getEtiquetaIcono(et)} ${et}`}
                            sx={{
                              bgcolor: 'rgba(255,255,255,0.85)',
                              color: '#333',
                              fontWeight: 'bold',
                            }}
                          />
                        ))}
                      </Stack>
                    )}
                  </Box>
                </Card>
              </motion.div>
            );
          })}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default MenuCategory;
