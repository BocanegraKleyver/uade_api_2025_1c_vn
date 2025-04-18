import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import menuData from '../data/menuData';
import {
  Container,
  Typography,
  Button,
  TextField,
  Rating,
  Box,
  Divider,
  Paper
} from '@mui/material';

// Imágenes
import medialunas from '../assets/platos/medialunas.jpg';
import asado from '../assets/platos/asado.jpg';
import milanesa from '../assets/platos/milanesa.jpg';
import pizza from '../assets/platos/pizza.jpg';
import hamburguesa from '../assets/platos/hamburguesa.jpg';
import alfajores from '../assets/platos/alfajores.jpg';
import tostadasDDL from '../assets/platos/tostadasDDL.jpg';
import fernetcoca from '../assets/platos/fernetcoca.jpg';
import malbec from '../assets/platos/malbec.jpg';

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

  const plato = menuData
    .flatMap(cat => cat.platos)
    .find(plato => plato.nombre.toLowerCase().replace(/\s+/g, '-') === nombre);

  const nombreFormateado = plato?.nombre?.toLowerCase().replace(/\s+/g, '');
  const imagen = imagenes[nombreFormateado] || null;

  const reseñasKey = `reseñas_${plato?.nombre || 'default'}`;
  const [reseñas, setReseñas] = useState([]);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [comentario, setComentario] = useState('');
  const [valoracion, setValoracion] = useState(0);

  // Cargar reseñas desde localStorage al montar
  useEffect(() => {
    const guardadas = localStorage.getItem(reseñasKey);
    if (guardadas) {
      setReseñas(JSON.parse(guardadas));
    }
  }, [reseñasKey]);

  // Guardar automáticamente cada vez que cambian
  useEffect(() => {
    localStorage.setItem(reseñasKey, JSON.stringify(reseñas));
  }, [reseñas, reseñasKey]);

  const agregarReseña = () => {
    if (!nuevoNombre || !comentario || valoracion === 0) return;

    const nueva = {
      nombre: nuevoNombre,
      comentario,
      valoracion,
      fecha: new Date().toLocaleDateString()
    };

    setReseñas(prev => [...prev, nueva]);
    setNuevoNombre('');
    setComentario('');
    setValoracion(0);
  };

  if (!plato) {
    return (
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h6">Plato no encontrado</Typography>
        <Button variant="contained" onClick={() => navigate(-1)}>Volver</Button>
      </Container>
    );
  }

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

      <Divider sx={{ marginY: 3 }} />

      <Typography variant="h6" gutterBottom>Agregar reseña</Typography>
      <Box display="flex" flexDirection="column" gap={2} maxWidth="500px">
        <TextField
          label="Tu nombre"
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
        />
        <TextField
          label="Comentario"
          multiline
          rows={3}
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        />
        <Rating
          name="valoracion"
          value={valoracion}
          onChange={(e, newValue) => setValoracion(newValue)}
        />
        <Button variant="contained" onClick={agregarReseña}>
          Enviar reseña
        </Button>
      </Box>

      {reseñas.length > 0 && (
        <>
          <Divider sx={{ marginY: 3 }} />
          <Typography variant="h6" gutterBottom>Reseñas</Typography>
          {reseñas.map((r, index) => (
            <Paper key={index} sx={{ padding: 2, marginBottom: 2 }}>
              <Typography variant="subtitle1"><strong>{r.nombre}</strong> - {r.fecha}</Typography>
              <Rating value={r.valoracion} readOnly />
              <Typography>{r.comentario}</Typography>
            </Paper>
          ))}
        </>
      )}

      <Button sx={{ marginTop: 3 }} variant="contained" onClick={() => navigate(-1)}>
        ⬅ Volver
      </Button>
    </Container>
  );
};

export default PlatoDetalle;
