import { Typography, Box } from "@mui/material";
import type { FC } from "react";

const NoDataPlaceholder: FC<{ message: string }> = ({ message }) => {
  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="body1" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

export default NoDataPlaceholder;
