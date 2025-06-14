import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RefreshIcon from "@mui/icons-material/Refresh";
import { REPORT_ROUTES } from "../../constants/routes";
import { useInvalidateReportsCache } from "../../hooks/useReportsApi";

const ServerOffline = () => {
  const navigate = useNavigate();
  const invalidateCache = useInvalidateReportsCache();
  const handleGoBack = () => {
    invalidateCache();
    navigate(REPORT_ROUTES.LIST);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
      px={2}
    >
      <Typography variant="h4" gutterBottom role="heading" aria-level={1}>
        Server is Offline
      </Typography>

      <Typography variant="body1" color="text.secondary" mb={4}>
        Please run <code>npm run server</code> in the root directory, then click
        the button below to try again.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        startIcon={<RefreshIcon />}
        onClick={handleGoBack}
        aria-label="Retry and go back to reports"
      >
        Get Me Back
      </Button>
    </Box>
  );
};

export default ServerOffline;
