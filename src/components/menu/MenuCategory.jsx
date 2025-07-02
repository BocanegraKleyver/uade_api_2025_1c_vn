import React, { useState } from 'react';
import {
  Accordion, AccordionSummary, AccordionDetails,
  Typography, Card, Box, Chip, Stack, Button, Rating,
  useMediaQuery, useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const MenuCategory = ({ categoria, platos }) => {
  const navigate = useNavigate();
  const [copiadoId, setCopiadoId] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Accordion disableGutters>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant={isMobile ? 'body1' : 'h6'} fontWeight="bold">
          {categoria}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box display="flex" flexDirection="column" gap={2}>
          {platos.map((plato, index) => {
            const imagen = `${process.env.REACT_APP_API_URL}/uploads/${plato.imagen}`;
            const promedio = plato.promedioValoracion;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  onClick={() => navigate(`/plato/${plato._id}`)}
                  sx={{
                    height: { xs: 'auto', sm: 240 },
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
                    '&:hover': { transform: 'scale(1.02)' },
                    minHeight: 200,
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
                        fontSize: '0.85rem',
                        zIndex: 10,
                      }}
                    >
                      ✅ Copiado al portapapeles
                    </Box>
                  )}

                  <Box
                    sx={{
                      width: '100%',
                      backdropFilter: 'blur(6px)',
                      background: 'rgba(0, 0, 0, 0.4)',
                      padding: { xs: 1.5, sm: 2 },
                    }}
                  >
                    <Typography variant="h6" noWrap={!isMobile}>
                      {plato.nombre}
                    </Typography>
                    <Typography variant="body2">${plato.precio}</Typography>

                    {promedio !== null && (
                      <Box mt={0.5}>
                        <Rating value={promedio} readOnly precision={0.5} size="small" />
                      </Box>
                    )}

                    {plato.etiquetas?.length > 0 && (
                      <Stack
                        direction="row"
                        spacing={1}
                        useFlexGap
                        flexWrap="wrap"
                        sx={{ mt: 1 }}
                      >
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
                        '&:hover': { backgroundColor: '#115293' },
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
      </AccordionDetails>
    </Accordion>
  );
};

export default MenuCategory;
