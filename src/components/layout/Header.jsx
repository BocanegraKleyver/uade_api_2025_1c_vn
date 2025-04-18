import React, { useState } from 'react';
import {AppBar,Toolbar,Typography,IconButton,Drawer,List,ListItem,ListItemText,Box,useMediaQuery,Button} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const Header = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  const drawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Carta" />
        </ListItem>
        <ListItem button component={Link} to="/contacto">
          <ListItemText primary="Contacto" />
        </ListItem>
        <ListItem button component={Link} to="/nosotros">
          <ListItemText primary="Sobre Nosotros" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2c2c2c' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{ textAlign: 'center', color: 'inherit', textDecoration: 'none' }}
        >
          Sabores Urbanos
        </Typography>

        {/* Desktop - Botones Contacto y Sobre Nosotros */}
        {!isMobile && (
          <Box sx={{ position: 'absolute', right: 16, display: 'flex', gap: 2 }}>
            <Button
              component={Link}
              to="/contacto"
              color="inherit"
              sx={{ fontWeight: 'bold' }}
            >
              Contacto
            </Button>
            <Button
              component={Link}
              to="/nosotros"
              color="inherit"
              sx={{ fontWeight: 'bold' }}
            >
              Sobre Nosotros
            </Button>
          </Box>
        )}

        {/* Mobile - Drawer con links */}
        {isMobile && (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ position: 'absolute', right: 10 }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
              {drawerList}
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;