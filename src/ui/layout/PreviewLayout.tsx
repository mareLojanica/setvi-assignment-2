import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface PreviewLayoutProps {
  title: string;
  children: React.ReactNode;
  backButtonOptions?: {
    navigateTo: () => void;
    label?: string;
  };
}

const PreviewLayout: React.FC<PreviewLayoutProps> = ({
  title,
  children,
  backButtonOptions,
}) => {
  const titleId = React.useId();

  return (
    <Box
      component="section"
      aria-labelledby={title ? titleId : undefined}
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "90vh",
        display: "flex",
      }}
    >
      <Paper
        component="article"
        elevation={3}
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          borderRadius: 2,
          minHeight: "90vh",
          flex: 1,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          gap={4}
          sx={{ flexDirection: { xs: "column", md: "row" } }}
        >
          {backButtonOptions && (
            <Button
              onClick={backButtonOptions.navigateTo}
              startIcon={<ArrowBackIcon />}
              variant="text"
              size="small"
            >
              {backButtonOptions.label || "Back"}
            </Button>
          )}
          {title && (
            <Typography
              id={titleId}
              variant="h5"
              fontWeight={600}
              component="h2"
            >
              {title}
            </Typography>
          )}
        </Box>

        <Box
          component="div"
          display="flex"
          flexDirection="column"
          gap={3}
          flex={1}
        >
          {children}
        </Box>
      </Paper>
    </Box>
  );
};

export default PreviewLayout;
