import React from 'react';
import {Container,Typography,Button,Box,Divider} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/layout/Footer';

const SobreNosotros = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          my: 6,
          background: 'rgba(255,255,255,0.85)',
          borderRadius: 3,
          padding: 4,
          backdropFilter: 'blur(10px)',
          boxShadow: 4,
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontFamily: 'Playfair Display',
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 4,
          }}
        >
          🧑‍🍳 Sobre Nosotros
        </Typography>

        <Box sx={{ fontFamily: 'Noto Znamenny Musical Notation', fontSize: '1.1rem' }}>
          <Typography sx={{ mb: 3 }}>
            <strong>Sabores Urbanos</strong> nace como una propuesta gastronómica moderna que combina la tradición culinaria argentina con la innovación digital.
          </Typography>

          <Typography sx={{ mb: 3 }}>
            Esta carta digital fue desarrollada por estudiantes de <strong>UADE</strong> como parte de un proyecto académico para la materia <em>Aplicaciones Interactivas</em>.
          </Typography>

          <Typography sx={{ mb: 3 }}>
            Nuestro objetivo es brindar una experiencia visualmente atractiva, rápida y accesible tanto para comensales como para el personal del restaurante. La aplicación fue diseñada con tecnologías modernas como <strong>React</strong>, <strong>Material UI</strong> y animaciones con <strong>Framer Motion</strong>.
          </Typography>

          <Typography sx={{ mb: 3 }}>
            Agradecemos tu visita y esperamos que disfrutes de nuestra propuesta tanto como nosotros disfrutamos desarrollarla.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography
            variant="body2"
            sx={{
              fontStyle: 'italic',
              textAlign: 'center',
              fontSize: '1rem',
              opacity: 0.85,
            }}
          >
            “La pasión por la cocina también se sirve con buen diseño.”
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Button
            variant="contained"
            onClick={() => navigate(-1)}
            sx={{
              fontFamily: 'Noto Znamenny Musical Notation',
              fontWeight: 'bold',
            }}
          >
            ⬅ Volver
          </Button>
        </Box>
      </Container>

      <Footer />
    </>
  );
};

export default SobreNosotros;
