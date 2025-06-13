import { Box } from "@mui/material";
import React, { type FC, type PropsWithChildren } from "react";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
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
      {children}
    </Box>
  );
};

export default MainLayout;
