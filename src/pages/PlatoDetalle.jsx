import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  TextField,
  Rating,
  Box,
  Divider,
  Paper,
  Stack,
  Fab,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { axiosPublic } from "../utils/axios";


const PlatoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [plato, setPlato] = useState(null);
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
    const fetchPlatoYResenias = async () => {
      try {
        const resPlato = await axiosPublic.get(`/platos/${id}/publico`);

        setPlato(resPlato.data);

        
        const resResenias = await axiosPublic.get(`/resenas/plato/${id}`);

        const activas = resResenias.data.filter(r => r.activo);
        setReseñas(activas);
      } catch (error) {
        console.error("Error al obtener plato o reseñas:", error);
      }
    };
    fetchPlatoYResenias();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const agregarReseña = async () => {
  const tieneError = {
    nombre: !nuevoNombre.trim(),
    comentario: !comentario.trim(),
    valoracion: valoracion === 0,
  };
  setErrores(tieneError);
  if (tieneError.nombre || tieneError.comentario || tieneError.valoracion) return;

  try {
    const nueva = {
      platoId: plato._id,
      platoNombre: plato.nombre,
      nombre: nuevoNombre.trim(),
      comentario: comentario.trim(),
      valoracion,
    };

    const res = await axiosPublic.post(`/resenas`, nueva);

    setReseñas([...reseñas, res.data]);
    setNuevoNombre('');
    setComentario('');
    setValoracion(0);
    setErrores({ nombre: false, comentario: false, valoracion: false });

    
    const claveLocal = `reseñas_${plato.nombre}`;
    const existentes = JSON.parse(localStorage.getItem(claveLocal)) || [];

    const nuevaMini = {
      valoracion: res.data.valoracion,
      fecha: res.data.fecha,
    };

    const actualizadas = [...existentes, nuevaMini];
    localStorage.setItem(claveLocal, JSON.stringify(actualizadas));
  } catch (error) {
    console.error("Error al guardar reseña:", error);
  }
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

  const promedio = reseñas.reduce((a, b) => a + b.valoracion, 0) / (reseñas.length || 1);
  const imagen = `${process.env.REACT_APP_API_URL}/uploads/${plato.imagen}`;

  return (
    <>
      <Container sx={{ background: 'rgba(255,255,255,0.85)', borderRadius: 3, p: { xs: 2, md: 6 }, backdropFilter: 'blur(10px)', boxShadow: 4, mt: 6, mb: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mb: 4 }}>
          <Box component="img" src={imagen} alt={plato.nombre} sx={{ width: { xs: '100%', md: '50%' }, borderRadius: 2, objectFit: 'cover' }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h3" gutterBottom sx={{ fontFamily: 'Playfair Display', fontSize: { xs: '2rem', md: '3.5rem' } }}>{plato.nombre}</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>{plato.descripcion}</Typography>
            <Typography variant="h5" sx={{ fontFamily: 'Playfair Display', mb: 1 }}><strong>Precio:</strong> ${plato.precio}</Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
  <strong>Ingredientes:</strong> {plato.ingredientes?.length ? plato.ingredientes.join(', ') : 'No especificados'}
</Typography>

            <Typography variant="body1" sx={{ mb: 2 }}>
  <strong>Alérgenos:</strong> {plato.alergenos?.length ? plato.alergenos.join(', ') : 'Ninguno'}
</Typography>
            {reseñas.length > 0 ? (
              <Box mt={5}>
                <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <strong>Valoración promedio:</strong>
                  <Rating value={promedio} precision={0.5} readOnly size="small" />
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
        <Typography variant="h5" gutterBottom>Opiniones de clientes</Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          <Box flex={1}>
            <Typography variant="subtitle1" gutterBottom>Agregar reseña</Typography>
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
              <Typography variant="subtitle1" gutterBottom>Reseñas previas</Typography>
              {reseñas.slice().reverse().map((r, index) => (
                <Paper key={index} sx={{ padding: 2, mb: 2 }}>
                  <Typography variant="subtitle2"><strong>{r.nombre}</strong> - {new Date(r.fecha).toLocaleDateString()}</Typography>
                  <Rating value={r.valoracion} readOnly size="small" />
                  <Typography variant="body2">{r.comentario}</Typography>
                  {r.respuesta?.texto && (
                    <Box mt={1} p={1} bgcolor="rgba(240,240,240,0.8)" borderRadius={1}>
                      <Typography variant="caption"><strong>Respuesta del administrador:</strong> {r.respuesta.texto}</Typography>
                    </Box>
                  )}
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

      
    </>
  );
};

export default PlatoDetalle;