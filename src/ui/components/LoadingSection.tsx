import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingSection: React.FC<{ text: string }> = ({ text }) => (
  <Box
    display="flex"
    alignItems="center"
    gap={2}
    mb={3}
    flexDirection={"column"}
    justifyContent={"center"}
    height={"100%"}
    flexGrow={1}
  >
    <CircularProgress size={24} />
    <Typography>{text}</Typography>
  </Box>
);

export default LoadingSection;
