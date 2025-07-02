import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import { Box, Container, useMediaQuery, useTheme } from "@mui/material";

const AdminLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#e5e9f0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AdminHeader />

      <Container
        maxWidth="xl"
        sx={{
          flexGrow: 1,
          pt: 3,
          pb: 6,
          px: isMobile ? 2 : 4,
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
};

export default AdminLayout;
