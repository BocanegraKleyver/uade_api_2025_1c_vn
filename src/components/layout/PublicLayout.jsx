import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const PublicLayout = () => {
  return (
    <Box sx={{ position: "relative", minHeight: "100vh" }}>
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default PublicLayout;
