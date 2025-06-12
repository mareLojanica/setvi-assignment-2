import { Box, Container } from "@mui/material";
import React, { type FC, type PropsWithChildren } from "react";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box component="main" role="main" sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            alignItems: "stretch",
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default MainLayout;
