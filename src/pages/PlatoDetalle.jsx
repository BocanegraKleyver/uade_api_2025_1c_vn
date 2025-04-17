import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import menuData from '../data/menuData';
import { Container, Typography, Button } from '@mui/material';

// 📸 Importar imágenes
import medialunas from '../assets/platos/medialunas.jpg';
import asado from '../assets/platos/asado.jpg';
import milanesa from '../assets/platos/milanesa.jpg';
import pizza from '../assets/platos/pizza.jpg';
import hamburguesa from '../assets/platos/hamburguesa.jpg';
import alfajores from '../assets/platos/alfajores.jpg';
import tostadasDDL from '../assets/platos/tostadasDDL.jpg';
import fernetcoca from '../assets/platos/fernetcoca.jpg';
import malbec from '../assets/platos/malbec.jpg';

// 🧠 Relacionar imágenes con nombres formateados
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

const PlatoDetalle = () => {
  const { nombre } = useParams();
  const navigate = useNavigate();

  // Buscar el plato por nombre en todas las categorías
  const plato = menuData
    .flatMap(cat => cat.platos)
    .find(plato => plato.nombre.toLowerCase().replace(/\s+/g, '-') === nombre);

  if (!plato) {
    return (
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h6">Plato no encontrado</Typography>
        <Button variant="contained" onClick={() => navigate(-1)}>Volver</Button>
      </Container>
    );
  }

  const nombreFormateado = plato.nombre.toLowerCase().replace(/\s+/g, '');
  const imagen = imagenes[nombreFormateado] || null;

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4">{plato.nombre}</Typography>

      {imagen && (
        <img
          src={imagen}
          alt={plato.nombre}
          style={{
            width: '100%',
            maxWidth: '500px',
            borderRadius: '8px',
            marginTop: '1rem'
          }}
        />
      )}

      <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
        {plato.descripcion}
      </Typography>
      <Typography sx={{ marginTop: 2 }}><strong>Precio:</strong> ${plato.precio}</Typography>
      <Typography><strong>Alérgenos:</strong> {plato.alergenos.join(', ') || 'Ninguno'}</Typography>
      
      <Button sx={{ marginTop: 3 }} variant="contained" onClick={() => navigate(-1)}>
        ⬅ Volver
      </Button>
    </Container>
  );
};

export default PlatoDetalle;
