import React, { useState } from 'react';
import {AppBar,Toolbar,Typography,IconButton,Drawer,List,ListItem,ListItemText,Box,useMediaQuery,Button,} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const Header = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  //const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const toggleDrawer = (state) => () => setOpen(state);

  const estiloBoton = {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '1rem',
    fontFamily: 'Noto Znamenny Musical Notation',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  };

  const menuItems = [
    { label: 'Home', to: '/' },
    { label: 'Platos', to: '/plato' },
    { label: 'Contacto', to: '/contacto' },
    { label: 'Sobre Nosotros', to: '/nosotros' },
  ];

  const drawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.to}
            component={Link}
            to={item.to}
            sx={{
              color: '#fff',
              textDecoration: 'none',
              '&:hover': { backgroundColor: '#222' },
            }}
          >
            <ListItemText
              primary={
                <Typography
                  sx={{
                    fontFamily: 'Noto Znamenny Musical Notation',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    color: '#fff',
                  }}
                >
                  {item.label}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#2c2c2c' }}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            px: 6,
            py: 1.5,
            position: 'relative',
          }}
        >
          <Typography
            variant="h4"
            component={Link}
            to="/"
            sx={{
              fontFamily: 'Playfair Display',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 'bold',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap',
            }}
          >
            Sabores Urbanos
          </Typography>

          {!isMobile && (
            <Box sx={{ position: 'absolute', right: 16, display: 'flex', gap: 3 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.to}
                  component={Link}
                  to={item.to}
                  sx={estiloBoton}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

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
      backgroundColor: '#2c2c2c',
      color: '#fff',
      boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.5)',
      borderLeft: '4px solid',
      borderImage: 'linear-gradient(to bottom, #ff5722, #ffc107) 1',
    },
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
