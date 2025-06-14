import type { Dispatch, SetStateAction } from "react";
import type { DragEndEvent } from "@dnd-kit/core";
import type { QUERY_KEYS } from "../constants/cache-eviction";
import type { SubmitHandler } from "react-hook-form";

import type { SxProps, Theme } from "@mui/material";

export type Report = {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  isDraft: boolean;
};

export type ReportFormValues = {
  title: string;
  content: string;
  isDraft: boolean;
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
  isDraft: boolean;
};


export type UpdateReportModalProps = {
  open: boolean;
  onClose: () => void;
  reportId: string;
  initialTitle: string;
  initialContent: string;
};

export type ReportFormProps = {
  defaultValues?: ReportFormValues;
  onSubmit: SubmitHandler<ReportFormValues>;
  submitLabel?: string;
  handleClose: () => void;
  isLoading?: boolean;
};

export type RichTextEditorProps = {
  initialValue?: string;
  onChange: (content: string) => void;
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
  isDraft: boolean;
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

export type PreviewLayoutProps = {
  title?: string;
  children: React.ReactNode;
  backButtonOptions?: BackButtonOptions;
  sx?: SxProps<Theme>;
};

export type BackButtonOptions = {
  navigateTo: () => void;
  label?: string;
};
export type MarkdownRendererProps = {
  content: string;
};
