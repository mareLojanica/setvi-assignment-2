import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { modalConfig } from "../../config/modalConfig";
import type { ModalType } from "../../types/enums";

interface CustomModalProps {
  open: boolean;
  type: ModalType | null;
  onClose: () => void;
}
const modalContentMap: Record<ModalType, React.ReactNode> = {
  "edit-report": <Typography>Editing existing report...</Typography>,
  "create-summary": <Typography>Summarizing the content...</Typography>,
  "create-draft": <Typography>Starting a new draft...</Typography>,
};

const CustomModal: React.FC<CustomModalProps> = ({ open, type, onClose }) => {
  if (!type) return null;

  const { title, description } = modalConfig[type];

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby={title}
      aria-describedby={description}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
          minWidth: 300,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <IconButton onClick={onClose} aria-label="Close modal" sx={{ ml: 2 }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box mt={2}>{modalContentMap[type]}</Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;
