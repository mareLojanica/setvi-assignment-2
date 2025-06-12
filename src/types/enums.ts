export const ModalType = {
  EditReport: "edit-report",
  CreateSummary: "create-summary",
  CreateDraft: "create-draft",
} as const;

export type ModalType = (typeof ModalType)[keyof typeof ModalType];
