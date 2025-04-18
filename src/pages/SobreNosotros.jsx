import React from 'react';
import { Container, Typography, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/layout/Footer';

const SobreNosotros = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container
        sx={{
          my: 6,
          background: 'rgba(255,255,255,0.85)',
          borderRadius: 3,
          padding: 4,
          backdropFilter: 'blur(10px)',
          boxShadow: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          🧑‍🍳 Sobre Nosotros
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>Sabores Urbanos</strong> nace como una propuesta gastronómica moderna que combina la tradición culinaria argentina con la innovación digital. Esta carta digital fue desarrollada por estudiantes de UADE como parte de un proyecto académico para la materia Aplicaciones Interactivas.
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          Nuestro objetivo es brindar una experiencia visualmente atractiva, rápida y accesible tanto para comensales como para el personal del restaurante. La aplicación fue diseñada con tecnologías modernas como React, Material UI y animaciones con Framer Motion.
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          Agradecemos tu visita y esperamos que disfrutes de nuestra propuesta tanto como nosotros disfrutamos desarrollarla.
        </Typography>

        <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 3 }}>
          “La pasión por la cocina también se sirve con buen diseño.”
        </Typography>

        <Button
          sx={{ mt: 4 }}
          variant="contained"
          onClick={() => navigate(-1)}
        >
          ⬅ Volver
        </Button>
      </Container>

      <Footer />
    </>
  );
};

export default SobreNosotros;
