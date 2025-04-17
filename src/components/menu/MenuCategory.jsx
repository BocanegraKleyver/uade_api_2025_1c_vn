import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Card,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

// Imágenes
import medialunas from '../../assets/platos/medialunas.jpg';
import asado from '../../assets/platos/asado.jpg';
import milanesa from '../../assets/platos/milanesa.jpg';
import pizza from '../../assets/platos/pizza.jpg';
import hamburguesa from '../../assets/platos/hamburguesa.jpg';
import alfajores from '../../assets/platos/alfajores.jpg';
import tostadasDDL from '../../assets/platos/tostadasDDL.jpg';
import fernetcoca from '../../assets/platos/fernetcoca.jpg';
import malbec from '../../assets/platos/malbec.jpg';

const imagenes = {
  medialunas,
  asado,
  milanesa,
  pizza,
  hamburguesa,
  alfajores,
  tostadasddl: tostadasDDL,
  fernetcoca,
  malbec
};

const MenuCategory = ({ categoria, platos }) => {
  const navigate = useNavigate();

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">{categoria}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box display="flex" flexDirection="column" gap={2}>
          {platos.map((plato, index) => {
            const nombreFormateado = plato.nombre.toLowerCase().replace(/\s+/g, '');
            const imagen = imagenes[nombreFormateado] || null;

            return (
              <Card
                key={index}
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
                  boxShadow: 3,
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.02)'
                  }
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.5)',
                    padding: 2
                  }}
                >
                  <Typography variant="h6">{plato.nombre}</Typography>
                  <Typography variant="body2">${plato.precio}</Typography>
                </Box>
              </Card>
            );
          })}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default MenuCategory;
