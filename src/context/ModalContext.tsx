import { createContext, useContext } from "react";
import type { ModalType } from "../types/enums";

export interface ModalContextType {
  modalType: ModalType | null;
  openDraftModal: () => void;
  openEditModal: () => void;
  openSummaryModal: () => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
