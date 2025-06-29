import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import { Box } from "@mui/material";

const AdminLayout = () => {
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
      <Box sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
