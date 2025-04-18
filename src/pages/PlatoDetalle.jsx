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
  Paper,
  Chip,
  Stack
} from '@mui/material';
import { getReseñas, guardarReseña } from '../services/reseñasService';
import Footer from '../components/layout/Footer';

// 📸 Imágenes
import medialunas from '../assets/platos/medialunas.jpg';
import asado from '../assets/platos/asado.jpg';
import milanesa from '../assets/platos/milanesa.jpg';
import alfajores from '../assets/platos/alfajores.jpg';
import tostadasDDL from '../assets/platos/tostadasDDL.jpg';
import fernetconcoca from '../assets/platos/fernetconcoca.jpg';
import malbec from '../assets/platos/malbec.jpg';
import omelettedeespinaca from '../assets/platos/omelettedeespinaca.jpg';
import tostadoconjamónyqueso from '../assets/platos/tostadoconjamónyqueso.jpg';
import ensaladacésar from '../assets/platos/ensaladacésar.jpg';
import ensaladaveggie from '../assets/platos/ensaladaveggie.jpg';
import ensaladaburrata from '../assets/platos/ensaladaburrata.jpg';
import bifedechorizo from '../assets/platos/bifedechorizo.jpg';
import bondiolaalacerveza from '../assets/platos/bondiolaalacerveza.jpg';
import lasagnaveggie from '../assets/platos/lasagnaveggie.jpg';
import pizzamargarita from '../assets/platos/pizzamargarita.jpg';
import hamburguesacompleta from '../assets/platos/hamburguesacompleta.jpg';
import hamburguesaveggie from '../assets/platos/hamburguesaveggie.jpg';
import flancasero from '../assets/platos/flancasero.jpg';
import volcándechocolate from '../assets/platos/volcándechocolate.jpg';
import cheesecake from '../assets/platos/cheesecake.jpg';
import cervezaipa from '../assets/platos/cervezaipa.jpg';
import aguasaborizada from '../assets/platos/aguasaborizada.jpg';

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

const PlatoDetalle = () => {
  const { nombre } = useParams();
  const navigate = useNavigate();

  const plato = menuData
    .flatMap(cat => cat.platos)
    .find(p => p.nombre.toLowerCase().replace(/\s+/g, '-') === nombre);

  const nombreFormateado = plato?.nombre?.toLowerCase().replace(/\s+/g, '');
  const imagen = imagenes[nombreFormateado] || null;

  const [reseñas, setReseñas] = useState([]);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [comentario, setComentario] = useState('');
  const [valoracion, setValoracion] = useState(0);
  const [errores, setErrores] = useState({ nombre: false, comentario: false, valoracion: false });

  useEffect(() => {
    if (plato?.nombre) {
      const data = getReseñas(plato.nombre);
      setReseñas(data);
    }
  }, [plato?.nombre]);

  const agregarReseña = () => {
    const tieneError = {
      nombre: !nuevoNombre.trim(),
      comentario: !comentario.trim(),
      valoracion: valoracion === 0
    };

    setErrores(tieneError);

    if (tieneError.nombre || tieneError.comentario || tieneError.valoracion) return;

    const nueva = {
      nombre: nuevoNombre.trim(),
      comentario: comentario.trim(),
      valoracion,
      fecha: new Date().toLocaleDateString(),
    };

    const actualizadas = guardarReseña(plato.nombre, nueva);
    setReseñas(actualizadas);
    setNuevoNombre('');
    setComentario('');
    setValoracion(0);
    setErrores({ nombre: false, comentario: false, valoracion: false });
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
    <>
      <Container
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
        <Typography variant="h4" gutterBottom>{plato.nombre}</Typography>

        {imagen && (
          <img
            src={imagen}
            alt={plato.nombre}
            style={{
              width: '100%',
              maxWidth: '500px',
              borderRadius: '8px',
              marginBottom: '1rem'
            }}
          />
        )}

        <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
          {plato.descripcion}
        </Typography>
        <Typography><strong>Precio:</strong> ${plato.precio}</Typography>
        <Typography><strong>Alérgenos:</strong> {plato.alergenos.join(', ') || 'Ninguno'}</Typography>

        {plato.etiquetas?.length > 0 && (
          <Stack direction="row" spacing={1} sx={{ mt: 1, mb: 2, flexWrap: 'wrap' }}>
            {plato.etiquetas.map((et, i) => (
              <Chip
                key={i}
                label={`${getEtiquetaIcono(et)} ${et}`}
                size="small"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.8)',
                  color: '#333',
                  fontWeight: 'bold'
                }}
              />
            ))}
          </Stack>
        )}

        <Divider sx={{ marginY: 3 }} />

        <Typography variant="h6" gutterBottom>Agregar reseña</Typography>
        <Box display="flex" flexDirection="column" gap={2} maxWidth="500px">
          <TextField
            label="Tu nombre"
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
            error={errores.nombre}
            helperText={errores.nombre && 'Por favor ingresá tu nombre'}
          />
          <TextField
            label="Comentario"
            multiline
            rows={3}
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            error={errores.comentario}
            helperText={errores.comentario && 'Por favor escribí un comentario'}
          />
          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>Valoración</Typography>
            <Rating
              name="valoracion"
              value={valoracion}
              onChange={(e, newValue) => setValoracion(newValue)}
            />
            {errores.valoracion && (
              <Typography variant="caption" color="error">
                Por favor seleccioná una valoración
              </Typography>
            )}
          </Box>

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

      <Footer /> {/* ✅ Se muestra siempre al final */}
    </>
  );
};

export default PlatoDetalle;
