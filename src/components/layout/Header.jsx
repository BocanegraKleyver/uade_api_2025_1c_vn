/*import React from 'react';

function Header() {
  return (
    <header className="header">
      <h1>El Sabor de la Tradición</h1>
      <nav>
        <ul>
          <li><a href="#entradas">Entradas</a></li>
          <li><a href="#principales">Platos Principales</a></li>
          <li><a href="#postres">Postres</a></li>
          <li><a href="#bebidas">Bebidas</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header; */

import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#2c2c2c' }}>
      <Toolbar>
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <Typography variant="h5" component="div">
            Sabores Urbanos
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
