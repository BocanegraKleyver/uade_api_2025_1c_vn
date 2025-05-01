import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import menuData from '../data/menuData';
import {Container,Typography,Button,TextField,Rating,Box,Divider,Paper,Stack,Fab} from '@mui/material';
import { getReseñas, guardarReseña } from '../services/reseñasService';
import Footer from '../components/layout/Footer';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

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
import polloalaparrilla from '../assets/platos/polloalaparrilla.jpg';


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

const PlatoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const plato = menuData
  .flatMap(cat => cat.platos)
  .find(p => p.id === parseInt(id));

  const nombreFormateado = plato ? normalizarNombre(plato.nombre) : '';
  const imagen = imagenes[nombreFormateado] || null;

  const [reseñas, setReseñas] = useState([]);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [comentario, setComentario] = useState('');
  const [valoracion, setValoracion] = useState(0);
  const [errores, setErrores] = useState({ nombre: false, comentario: false, valoracion: false });
  const [visible, setVisible] = useState(false);


useEffect(() => {
  const handleScroll = () => setVisible(window.scrollY > 300);
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

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
      <Container sx={{ mt: 8, p: 4, textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.85)', borderRadius: 3, boxShadow: 4, backdropFilter: 'blur(6px)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', fontFamily: 'Playfair Display', color: '#1976d2' }}>
          😕 Plato no encontrado
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          El plato que estás buscando no existe o fue eliminado del menú.
        </Typography>
        <Button variant="contained" size="large" onClick={() => navigate(-1)}>⬅ Volver</Button>
      </Container>
    );
  }

  return (
    <>
      <Container sx={{ background: 'rgba(255,255,255,0.85)', borderRadius: 3, p: { xs: 2, md: 6 }, backdropFilter: 'blur(10px)', boxShadow: 4, mt: 6, mb: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mb: 4 }}>
          {imagen && (
            <Box component="img" src={imagen} alt={plato.nombre} sx={{ width: { xs: '100%', md: '50%' }, borderRadius: 2, objectFit: 'cover' }} />
          )}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h3" gutterBottom sx={{ fontFamily: 'Playfair Display', fontSize: { xs: '2rem', md: '3.5rem' } }}>{plato.nombre}</Typography>
            <Typography variant="body1" sx={{ mb: 2, fontSize: { xs: '1rem', md: '1.2rem' }, fontFamily: 'Noto Znamenny Musical Notation' }}>{plato.descripcion}</Typography>
            <Typography variant="h5" sx={{ fontFamily: 'Playfair Display', mb: 1 }}><strong>Precio:</strong> ${plato.precio}</Typography>
            <Typography variant="body1" sx={{ mb: 1 }}><strong>Ingredientes:</strong> {plato.ingredientes.join(', ')}</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}><strong>Alérgenos:</strong> {plato.alergenos.join(', ') || 'Ninguno'}</Typography>

            {reseñas.length > 0 ? (
              <Box mt={5}>
                <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <strong>Valoración promedio:</strong>
                  <Rating value={reseñas.reduce((a, b) => a + b.valoracion, 0) / reseñas.length} precision={0.5} readOnly size="small" />
                  ({reseñas.length} reseña{reseñas.length > 1 ? 's' : ''})
                </Typography>
              </Box>
            ) : (
              <Typography variant="subtitle1" sx={{ mt: 5, fontStyle: 'italic' }}>
                Este plato aún no tiene valoraciones.
              </Typography>
            )}
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />
        <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Playfair Display', mb: 2 }}>
          Opiniones de clientes
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          <Box flex={1}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>Agregar reseña</Typography>
            <Stack spacing={2}>
              <TextField label="Tu nombre" value={nuevoNombre} onChange={(e) => setNuevoNombre(e.target.value)} error={errores.nombre} helperText={errores.nombre && 'Por favor ingresá tu nombre'} />
              <TextField label="Comentario" multiline rows={3} value={comentario} onChange={(e) => setComentario(e.target.value)} error={errores.comentario} helperText={errores.comentario && 'Por favor escribí un comentario'} />
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>Valoración</Typography>
                <Rating name="valoracion" value={valoracion} onChange={(e, newValue) => setValoracion(newValue)} />
                {errores.valoracion && <Typography variant="caption" color="error">Por favor seleccioná una valoración</Typography>}
              </Box>
              <Button variant="contained" onClick={agregarReseña}>Enviar reseña</Button>
            </Stack>
          </Box>

          {reseñas.length > 0 && (
            <Box flex={1} sx={{ maxHeight: '400px', overflowY: 'auto', pr: 1 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>Reseñas previas</Typography>
              {reseñas.slice().reverse().map((r, index) => (
  <Paper key={index} sx={{ padding: 2, mb: 2 }}>
    <Typography variant="subtitle2"><strong>{r.nombre}</strong> - {r.fecha}</Typography>
    <Rating value={r.valoracion} readOnly size="small" />
    <Typography variant="body2">{r.comentario}</Typography>
  </Paper>
))}
            </Box>
          )}
        </Box>

        <Button sx={{ mt: 4 }} variant="contained" onClick={() => navigate(-1)}>⬅ Volver</Button>
      </Container>

      {visible && (
        <Fab color="primary" onClick={scrollToTop} sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
          <KeyboardArrowUpIcon />
        </Fab>
      )}

      <Footer />
    </>
  );
};

export default PlatoDetalle;
