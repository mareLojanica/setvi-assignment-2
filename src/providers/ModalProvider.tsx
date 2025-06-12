import React, { useState, type FC, type PropsWithChildren } from "react";
import { ModalContext } from "../context/ModalContext";
import type { ModalType } from "../types/enums";
import { ModalType as ModalKeys } from "../types/enums"; // if using const

import CustomModal from "../components/CustomModal";

export const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [modalType, setModalType] = useState<ModalType | null>(null);

  const closeModal = () => setModalType(null);
  const openDraftModal = () => setModalType(ModalKeys.CreateDraft);
  const openEditModal = () => setModalType(ModalKeys.EditReport);
  const openSummaryModal = () => setModalType(ModalKeys.CreateSummary);

  return (
    <ModalContext.Provider
      value={{
        modalType,
        openDraftModal,
        openEditModal,
        openSummaryModal,
        closeModal,
      }}
    >
      {children}
      <CustomModal open={!!modalType} type={modalType} onClose={closeModal} />
    </ModalContext.Provider>
  );
};
