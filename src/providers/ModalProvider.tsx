import React, { useState, type FC, type PropsWithChildren } from "react";
import { ModalContext, type ModalPayload } from "../context/ModalContext";
import type { ModalType } from "../types/enums";
import { ModalType as ModalKeys } from "../types/enums";

import CustomModal from "../components/CustomModal";
export type ModalState = {
  type: ModalType | null;
  data?: ModalPayload;
} | null;

export const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [modalState, setModalState] = useState<ModalState>({ type: null });

  const closeModal = () => setModalState({ type: null });

  const openDraftModal = (data?: ModalPayload) =>
    setModalState({ type: ModalKeys.CreateDraft, data });

  const openEditModal = (data?: ModalPayload) =>
    setModalState({ type: ModalKeys.EditReport, data });

  const openSummaryModal = (data?: ModalPayload) =>
    setModalState({ type: ModalKeys.CreateSummary, data });

  const openShowMoreModal = (data?: ModalPayload) =>
    setModalState({ type: ModalKeys.ShowMore, data });

  return (
    <ModalContext.Provider
      value={{
        modalState,
        openDraftModal,
        openEditModal,
        openSummaryModal,
        openShowMoreModal,
        closeModal,
      }}
    >
      {children}
      {modalState && (
        <CustomModal
          open={!!modalState?.type}
          type={modalState.type}
          modalTitle={modalState.data?.modalTitle ?? ""}
          title={modalState.data?.title}
          content={modalState.data?.content}
          onClose={closeModal}
        />
      )}
    </ModalContext.Provider>
  );
};
