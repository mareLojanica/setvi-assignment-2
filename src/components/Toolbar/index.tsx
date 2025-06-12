import React, { type FC } from "react";
import { Box, Button, TextField, useMediaQuery, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useModal } from "../../context/ModalContext";

const ToolbarBar: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { openDraftModal } = useModal();
  return (
    <Box
      role="search"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        mt: 2,
      }}
    >
      <TextField
        label="Search reports"
        variant="outlined"
        size="small"
        fullWidth={isMobile}
        aria-label="Search reports"
      />

      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
          justifyContent: isMobile ? "center" : "flex-end",
          width: isMobile ? "100%" : "auto",
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          aria-label="Create draft report"
          onClick={openDraftModal}
        >
          Create Draft
        </Button>
      </Box>
    </Box>
  );
};

export default ToolbarBar;
