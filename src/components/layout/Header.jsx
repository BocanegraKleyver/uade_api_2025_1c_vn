import React, { useState } from 'react';
import {AppBar,Toolbar,Typography,IconButton,Drawer,List,ListItem,ListItemText,Box,useMediaQuery,Button} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const Header = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
        <ListItem button component={Link} to="/"
          sx={{
           color: '#fff',
           textDecoration: 'none',
           '&:visited': { color: '#fff' },
           '&:hover': { backgroundColor: '#222' }
         }}
        >
          <ListItemText primary="Carta" />
        </ListItem>
        <ListItem button component={Link} to="/contacto"
          sx={{
          color: '#fff',
          textDecoration: 'none',
          '&:visited': { color: '#fff' },
          '&:hover': { backgroundColor: '#222' }
          }}
        >
          <ListItemText primary="Contacto" />
        </ListItem>
        <ListItem button component={Link} to="/nosotros"
          sx={{
          color: '#fff',
          textDecoration: 'none',
          '&:visited': { color: '#fff' },
          '&:hover': { backgroundColor: '#222' }
          }}
        >
          <ListItemText primary="Sobre Nosotros" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
    <AppBar position="static" sx={{ backgroundColor: '#2c2c2c' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{ textAlign: 'center', color: 'inherit', textDecoration: 'none', fontFamily: 'Bebas Neue'}}
        >
          Sabores Urbanos
        </Typography>

        {/* Desktop - Botones Contacto y Sobre Nosotros */}
        {!isMobile && (
          <Box sx={{ position: 'absolute', right: 16, display: 'flex', gap: 2 }}>
            <Button
              component={Link}
              to="/contacto"
              color="fff"
              sx={{ fontWeight: 'bold', fontFamily: 'Noto Znamenny Musical Notation' }}
            >
              Contacto
            </Button>
            <Button
              component={Link}
              to="/nosotros"
              color="fff"
              sx={{ fontWeight: 'bold', fontFamily: 'Noto Znamenny Musical Notation' }}
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
            <Drawer
                anchor="right"
                open={open}
                onClose={toggleDrawer(false)}
                PaperProps={{
                  sx: {
                    backgroundColor: '#343434',
                  }
                }}
              >
                {drawerList}
              </Drawer>
            </>
        )}
      </Toolbar>
    </AppBar>
    <Box sx={{ height: '4px', background: 'linear-gradient(to right, #ff5722, #ffc107)' }} />
    </>
  );
};

export default Header;