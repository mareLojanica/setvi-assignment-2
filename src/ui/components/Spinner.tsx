import React from "react";
import { Box, CircularProgress } from "@mui/material";

const Spinner: React.FC = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      width: "100%",
    }}
  >
    <CircularProgress />
  </Box>
);

export default Spinner;
