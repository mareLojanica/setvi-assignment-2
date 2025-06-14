import { useMutation } from "@tanstack/react-query";
import { draftContent, summarizeContent } from "../api/openApi";
import type { ChatCompletionResponse, DraftContentInput } from "../types/types";


export const useSummarizeContent = () =>
  useMutation<ChatCompletionResponse, Error, { title: string; content: string }>({
    mutationFn: ({ title, content }) => summarizeContent(title, content),
  });

  export const useDraftContent = () =>
  useMutation<ChatCompletionResponse, Error, DraftContentInput>({
    mutationFn: ({ title, content }) => draftContent(title, content),
  });