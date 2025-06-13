import type { Dispatch, SetStateAction } from "react";
import type { DragEndEvent } from "@dnd-kit/core";
import type { QUERY_KEYS } from "../constants/cache-eviction";

export type Report = {
  id: string;
  title: string;
  content: string;
  timestamp: string;
};

export type ReportFormValues = {
  title: string;
  content: string;
};

export type ModalPayload = {
  modalTitle?: string;
  title?: string;
  content?: string;
  reportId?: string;
};

export const ModalType = {
  EditReport: "edit-report",
  CreateSummary: "create-summary",
  CreateDraft: "create-draft",
  ShowMore: "show-more",
  CreateNewReport: "create-new-report",
} as const;

export type ModalType = (typeof ModalType)[keyof typeof ModalType];

export type ModalContextType = {
  modalState: ModalState;
  closeModal: () => void;
  openDraftModal: (data?: ModalPayload) => void;
  openEditModal: (data?: ModalPayload) => void;
  openSummaryModal: (data?: ModalPayload) => void;
  openShowMoreModal: (data?: ModalPayload) => void;
  openCreateNewReportModal: (data?: ModalPayload) => void;
  isSummaryLoading: boolean;
  setIsSummaryLoading: Dispatch<SetStateAction<boolean>>;
  setModalContent: (content: string) => void;
};

export type ModalConfig = {
  title: string;
  description?: string;
};

export type ReportsContextType = {
  reports: Report[];
  filteredReports: Report[];
  onFilterChange: (value: string) => void;
  filter: string;
  isLoading: boolean;
  setFilteredReports: Dispatch<SetStateAction<Report[]>>;
  reorderReports: (event: DragEndEvent) => void;
};

export type CreateReportModalProps = {
  onClose: () => void;
};

export type ReportCardProps = {
  id: string;
  title: string;
  content: string;
  onEdit: (title: string, content: string, reportId: string) => void;
  onSummarize: (modalTitle: string) => void;
};

export type ReportModalsProps = {
  open: boolean;
  type: ModalType;
  title?: string;
  content?: string;
  onClose: () => void;
  modalTitle: string;
  reportId?: string;
};

export type UpdateReportModalProps = {
  open: boolean;
  onClose: () => void;
  reportId: string;
  initialTitle: string;
  initialContent: string;
};

export type ReportFormProps = {
  defaultValues?: Partial<ReportFormValues>;
  onSubmit: (data: ReportFormValues) => Promise<void>;
  submitLabel?: string;
  handleClose: () => void;
  isLoading?: boolean;
};

export type RichTextEditorProps = {
  initialValue?: string;
  onChange: (content: string) => void;
};

export type ModalState = {
  type: ModalType | null;
  data?: ModalPayload;
};
export type QueryKey = (typeof QUERY_KEYS)[keyof typeof QUERY_KEYS];

export type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type ChatCompletionRequest = {
  model: string;
  messages: ChatMessage[];
  store?: boolean;
};

export type ChatCompletionResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
      refusal: string | null;
      annotations: unknown[];
    };
    logprobs: unknown | null;
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    prompt_tokens_details: Record<string, number>;
    completion_tokens_details: Record<string, number>;
  };
  service_tier: string;
  system_fingerprint: string;
};
export type DraggableCardProps = {
  title: string;
  content: string;
  onSummarize: (modalTitle: string) => void;
  onEdit: (title: string, content: string, reportId: string) => void;
  id: string;
};

export type ContentModalProps = {
  onClose: () => void;
  title: string;
  content: string;
  modalTitle: string;
};
export type DraftContentInput = {
  title: string;
  content: string;
};
