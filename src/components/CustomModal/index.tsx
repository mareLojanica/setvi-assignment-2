import React, { Suspense } from "react";
import { Modal, Box, Typography, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { modalConfig } from "../../config/modalConfig";
import type { ModalType } from "../../types/enums";
import RichTextEditor from "../RichTextEditor";

interface CustomModalProps {
  open: boolean;
  type: ModalType | null;
  title?: string;
  content?: string;
  onClose: () => void;
  modalTitle: string;
}

const renderModalContent = (
  type: ModalType,
  content?: string,
  title?: string
): React.ReactNode => {
  switch (type) {
    case "edit-report":
    case "create-draft":
      return (
        <>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Title:
          </Typography>
          <input
            type="text"
            defaultValue={title}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "16px",
              borderRadius: 4,
              border: "1px solid #ccc",
            }}
          />
          <Typography variant="body2" sx={{ mb: 1 }}>
            Content:
          </Typography>
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <Suspense fallback={<Typography>Loading editor...</Typography>}>
              <RichTextEditor
                initialValue={content}
                onChange={(value: string) => console.log(value)}
              />
            </Suspense>
          </div>
        </>
      );

    case "create-summary":
    case "show-more":
      return (
        <Box
          sx={{
            flexGrow: 1,
            maxHeight: "80vh",
            maxWidth: "80vw",
            overflow: "auto",
            fontSize: 14,
          }}
          dangerouslySetInnerHTML={{ __html: content ?? "" }}
          aria-label={`${title} content`}
        />
      );

    default:
      return null;
  }
};
const renderModalFooter = (
  type: ModalType,
  onClose: () => void,
  onSave?: () => void
) => {
  switch (type) {
    case "edit-report":
    case "create-draft":
      return (
        <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={onSave}>
            Save
          </Button>
        </Box>
      );

    case "create-summary":
    case "show-more":
      return (
        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Close
          </Button>
        </Box>
      );

    default:
      return null;
  }
};

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  type,
  onClose,
  content,
  title,
  modalTitle,
}) => {
  if (!type) return null;
  const { description } = modalConfig[type];

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby={description}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
          maxWidth: "90vw",
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            {modalTitle}
          </Typography>
          <IconButton onClick={onClose} aria-label="Close modal" sx={{ ml: 2 }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box mt={2}>{renderModalContent(type, content, title)}</Box>
        {renderModalFooter(type, onClose)}
      </Box>
    </Modal>
  );
};

export default CustomModal;
