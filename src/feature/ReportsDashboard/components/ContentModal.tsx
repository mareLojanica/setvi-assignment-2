import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useModal } from "../../../context/ModalContext";
import type { ContentModalProps } from "../../../types/types";

const ContentModal: React.FC<ContentModalProps> = ({ title, content }) => {
  const { isSummaryLoading } = useModal();

  return (
    <Box
      sx={{
        flexGrow: 1,
        maxHeight: "70vh",
        overflow: "auto",
        fontSize: 14,
        p: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: isSummaryLoading ? "center" : "start",
        minHeight: "150px",
      }}
    >
      {isSummaryLoading ? (
        <Box textAlign="center">
          <CircularProgress size={24} sx={{ mb: 2 }} />
          <Typography variant="body2" color="textSecondary">
            Generating summary...
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{ width: "100%" }}
          dangerouslySetInnerHTML={{ __html: content }}
          aria-label={`${title} content`}
        />
      )}
    </Box>
  );
};

export default ContentModal;
