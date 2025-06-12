import { createContext, useContext } from "react";
import type { ModalState } from "../providers/ModalProvider";
export interface ModalPayload {
  modalTitle?: string;
  title?: string;
  content?: string;
  reportId: number;
}
export interface ModalContextType {
  modalState: ModalState;
  openDraftModal: (data?: ModalPayload) => void;
  openEditModal: (data?: ModalPayload) => void;
  openSummaryModal: (data?: ModalPayload) => void;
  openShowMoreModal: (data?: ModalPayload) => void;
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
