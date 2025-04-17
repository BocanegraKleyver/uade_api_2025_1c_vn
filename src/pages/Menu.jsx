import React from 'react';
import { Container, Typography } from '@mui/material';
import menuData from '../data/menuData';
import MenuCategory from '../components/menu/MenuCategory';

const Menu = () => {
  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Carta de Sabores Urbanos
      </Typography>
      {menuData.map((categoria, index) => (
        <MenuCategory key={index} {...categoria} />
      ))}
    </Container>
  );
};

export default Menu;
