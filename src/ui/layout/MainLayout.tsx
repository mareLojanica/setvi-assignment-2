import { Box } from "@mui/material";
import React, { type FC } from "react";
import { Outlet } from "react-router-dom";

const MainLayout: FC = () => {
  return (
    <Box
      component="main"
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        alignItems: "stretch",
        p: 4,
      }}
    >
      <Outlet />
    </Box>
  );
};

export default MainLayout;
