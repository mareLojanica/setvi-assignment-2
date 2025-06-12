import React, { type FC, type PropsWithChildren } from "react";
import { Box } from "@mui/material";

const ResponsiveGrid: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      display="grid"
      columnGap={2}
      rowGap={4}
      sx={{
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        },
      }}
    >
      {children}
    </Box>
  );
};

export default ResponsiveGrid;
