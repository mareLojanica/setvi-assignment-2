import React, { Suspense, useEffect, useState } from "react";
import { Modal, Box, Typography, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { modalConfig } from "../../config/modalConfig";
import type { ModalType } from "../../types/enums";
import RichTextEditor from "../RichTextEditor";
import { updateReport } from "../../api/reportsApi";
import { useQueryClient } from "@tanstack/react-query";

interface CustomModalProps {
  open: boolean;
  type: ModalType;
  title?: string;
  content?: string;
  onClose: () => void;
  modalTitle: string;
  reportId: number;
}

const renderModalContent = (
  type: ModalType,
  title: string,
  content: string,
  setTitle: (val: string) => void,
  setContent: (val: string) => void
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
                onChange={(val) => setContent(val)}
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
          dangerouslySetInnerHTML={{ __html: content }}
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
): React.ReactNode => {
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
  content = "",
  title = "",
  modalTitle,
  reportId,
}) => {
  const [editableTitle, setEditableTitle] = useState(title);
  const [editableContent, setEditableContent] = useState(content);
  const { description } = modalConfig?.[type] ?? "";
  const queryClient = useQueryClient();
  useEffect(() => {
    if (open) {
      setEditableTitle(title);
      setEditableContent(content);
    }
  }, [open, title, content]);

  const handleSave = async () => {
    if (type === "edit-report") {
      try {
        await updateReport({
          id: reportId,
          title: editableTitle,
          content: editableContent,
        });

        queryClient.invalidateQueries({ queryKey: ["reports"] });

        onClose();
      } catch (err) {
        console.error("Failed to update report", err);
      }
    }
  };

  if (!type) return null;

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
          <IconButton onClick={onClose} aria-label="Close modal">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box mt={2}>
          {renderModalContent(
            type,
            editableTitle,
            editableContent,
            setEditableTitle,
            setEditableContent
          )}
        </Box>

        {renderModalFooter(type, onClose, handleSave)}
      </Box>
    </Modal>
  );
};

export default CustomModal;
