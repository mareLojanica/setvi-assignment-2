import type { ModalConfig, ModalType } from "../../types/types";


export const modalConfig: Record<ModalType, ModalConfig> = {
  "edit-report": {
    title: "Edit Report",
    description: "Edit the selected report",
  },
  "create-summary": {
    title: "Create Summary",
    description: "Summarize the report content",
  },
  "create-draft": {
    title: "Create Draft",
    description: "Start a new report draft",
  },
  "show-more": {
    title: "Full Report Content",
    description: "See the full content of the report",
  },
  "create-new-report": {
    title: "Create New Report",
    description: "Create a new report from scratch",
  },
};
