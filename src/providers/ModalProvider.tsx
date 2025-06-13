import React, { useState, type FC, type PropsWithChildren } from "react";
import { ModalContext } from "../context/ModalContext";
import type { ModalPayload, ModalState } from "../types/types";
import { ModalType as ModalKeys } from "../types/types";
import ReportModals from "../feature/ReportsDashboard/components/ReportModals";

export const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [modalState, setModalState] = useState<ModalState>({ type: null });
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);

  const closeModal = () => setModalState({ type: null });

  const openDraftModal = (data?: ModalPayload) =>
    setModalState({ type: ModalKeys.CreateDraft, data });

  const openEditModal = (data?: ModalPayload) =>
    setModalState({ type: ModalKeys.EditReport, data });

  const openSummaryModal = (data?: ModalPayload) =>
    setModalState({ type: ModalKeys.CreateSummary, data });

  const openShowMoreModal = (data?: ModalPayload) =>
    setModalState({ type: ModalKeys.ShowMore, data });

  const openCreateNewReportModal = (data?: ModalPayload) =>
    setModalState({ type: ModalKeys.CreateNewReport, data });

  const setModalContent = (content: string) => {
    setModalState((prev) =>
      prev?.data
        ? {
            ...prev,
            data: {
              ...prev.data,
              content,
            },
          }
        : prev
    );
  };

  return (
    <ModalContext.Provider
      value={{
        modalState,
        closeModal,
        openDraftModal,
        openEditModal,
        openSummaryModal,
        openShowMoreModal,
        openCreateNewReportModal,
        isSummaryLoading,
        setModalContent,
        setIsSummaryLoading,
      }}
    >
      {children}
      {modalState?.data && modalState?.type && (
        <ReportModals
          open={!!modalState?.type}
          type={modalState.type}
          modalTitle={modalState.data?.modalTitle ?? ""}
          title={modalState.data?.title}
          content={modalState.data?.content}
          onClose={closeModal}
          reportId={modalState.data?.reportId}
        />
      )}
    </ModalContext.Provider>
  );
};
