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

// 📸 Imágenes nuevas (resumido: se importan dinámicamente)
import empanadas from '../assets/platos/empanadassaltenas.jpg';
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
import truchapatagonica from '../assets/platos/truchapatagonica.jpg';
import merluzaalimon from '../assets/platos/merluzaalimon.jpg';
import noquisconbolognesa from '../assets/platos/noquisconbolognesa.jpg';
import raviolesdeverdura from '../assets/platos/raviolesdeverdura.jpg';
import lasagnaveggie from '../assets/platos/lasagnaveggie.jpg';
import flancasero from '../assets/platos/flancasero.jpg';
import volcandechocolate from '../assets/platos/volcandechocolate.jpg';
import cheesecake from '../assets/platos/cheesecake.jpg';
import alfajores from '../assets/platos/alfajores.jpg';
import vinomalbec from '../assets/platos/vinomalbec.jpg';
import cervezaipa from '../assets/platos/cervezaipa.jpg';
import fernetconcoca from '../assets/platos/fernetconcoca.jpg';
import aguasaborizada from '../assets/platos/aguasaborizada.jpg';
import gaseosacocacola from '../assets/platos/gaseosacocacola.jpg';
import limonadacasera from '../assets/platos/limonadacasera.jpg';
import aguamineralcongas from '../assets/platos/aguamineralcongas.jpg';
import aguamineralsingas from '../assets/platos/aguamineralsingas.jpg';

const imagenes = {
  empanadas,
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
  truchapatagonica,
  merluzaalimon,
  noquisconbolognesa,
  raviolesdeverdura,
  lasagnaveggie,
  flancasero,
  volcandechocolate,
  cheesecake,
  alfajores,
  vinomalbec,
  cervezaipa,
  fernetconcoca,
  aguasaborizada,
  gaseosacocacola,
  limonadacasera,
  aguamineralcongas,
  aguamineralsingas,
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mb: 4 }}>
          {imagen && (
            <Box
              component="img"
              src={imagen}
              alt={plato.nombre}
              sx={{ width: { xs: '100%', md: '50%' }, borderRadius: 2, objectFit: 'cover' }}
            />
          )}

          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" gutterBottom>{plato.nombre}</Typography>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>{plato.descripcion}</Typography>
            <Typography><strong>Precio:</strong> ${plato.precio}</Typography>
            <Typography><strong>Ingredientes:</strong> {plato.ingredientes.join(', ')}</Typography>
            <Typography><strong>Alérgenos:</strong> {plato.alergenos.join(', ') || 'Ninguno'}</Typography>

            {reseñas.length > 0 ? (
              <Box mt={2}>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <strong>Valoración promedio:</strong>
                  <Rating value={reseñas.reduce((a, b) => a + b.valoracion, 0) / reseñas.length} precision={0.5} readOnly size="small" />
                  ({reseñas.length} reseña{reseñas.length > 1 ? 's' : ''})
                </Typography>
              </Box>
            ) : (
              <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
                Este plato aún no tiene valoraciones.
              </Typography>
            )}

            {plato.etiquetas?.length > 0 && (
              <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
                {plato.etiquetas.map((et, i) => (
                  <Chip
                    key={i}
                    label={`${getEtiquetaIcono(et)} ${et}`}
                    size="small"
                    sx={{ bgcolor: 'rgba(255,255,255,0.8)', color: '#333', fontWeight: 'bold' }}
                  />
                ))}
              </Stack>
            )}
          </Box>
        </Box>

        <Divider sx={{ marginY: 3 }} />
        <Typography variant="h6" gutterBottom>Opiniones de clientes</Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mt: 2 }}>
          <Box flex={1}>
            <Typography variant="subtitle1" gutterBottom>Agregar reseña</Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField label="Tu nombre" value={nuevoNombre} onChange={(e) => setNuevoNombre(e.target.value)} error={errores.nombre} helperText={errores.nombre && 'Por favor ingresá tu nombre'} />
              <TextField label="Comentario" multiline rows={3} value={comentario} onChange={(e) => setComentario(e.target.value)} error={errores.comentario} helperText={errores.comentario && 'Por favor escribí un comentario'} />
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>Valoración</Typography>
                <Rating name="valoracion" value={valoracion} onChange={(e, newValue) => setValoracion(newValue)} />
                {errores.valoracion && <Typography variant="caption" color="error">Por favor seleccioná una valoración</Typography>}
              </Box>
              <Button variant="contained" onClick={agregarReseña}>Enviar reseña</Button>
            </Box>
          </Box>

          {reseñas.length > 0 && (
            <Box flex={1} sx={{ maxHeight: '400px', overflowY: 'auto', pr: 1 }}>
              <Typography variant="subtitle1" gutterBottom>Reseñas previas</Typography>
              {reseñas.map((r, index) => (
                <Paper key={index} sx={{ padding: 2, mb: 2 }}>
                  <Typography variant="subtitle2"><strong>{r.nombre}</strong> - {r.fecha}</Typography>
                  <Rating value={r.valoracion} readOnly size="small" />
                  <Typography variant="body2">{r.comentario}</Typography>
                </Paper>
              ))}
            </Box>
          )}
        </Box>

        <Button sx={{ marginTop: 4 }} variant="contained" onClick={() => navigate(-1)}>⬅ Volver</Button>
      </Container>

      <Footer />
    </>
  );
};

export default PlatoDetalle;
