import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ModalType, type ReportModalsProps } from "../../../types/types";

import { modalConfig } from "../../config/modalConfig";
import CreateReportModal from "./CreateReportModal";
import UpdateReportModal from "./UpdateReportModal";
import ContentModal from "./ContentModal";
import DraftModal from "./DraftModal";

const ReportModals: React.FC<ReportModalsProps> = ({
  open,
  type,
  onClose,
  modalTitle,
  reportId,
  title,
  content,
}) => {
  const { description } = modalConfig?.[type] ?? "";

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
          maxWidth: "600px",
          width: "90vw",
          mx: "auto",
          mt: "10vh",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography id="modal-title" variant="h6">
            {modalTitle}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {type === ModalType.CreateNewReport && (
          <CreateReportModal onClose={onClose} />
        )}
        {type === ModalType.EditReport && (
          <UpdateReportModal
            onClose={onClose}
            reportId={reportId ?? ""}
            open={false}
            initialTitle={title ?? ""}
            initialContent={content ?? ""}
          />
        )}
        {[ModalType.CreateSummary, ModalType.ShowMore].includes(type) && (
          <ContentModal
            title={title ?? ""}
            content={content ?? ""}
            modalTitle="Summary"
            onClose={onClose}
          />
        )}
        {ModalType.CreateDraft === type && <DraftModal />}
      </Box>
    </Modal>
  );
};

export default ReportModals;
