import { ENDPOINTS } from "../constants/endpoints";
import { SUMMARIZE_PROMPT } from "../constants/prompts";
import type {
  ChatCompletionRequest,
  ChatCompletionResponse,
} from "../types/types";
import { openaiApi } from "./openApiClient";

export const summarizeContent = async (
  title: string,
  content: string,
  prompt: string = SUMMARIZE_PROMPT
): Promise<ChatCompletionResponse> => {
  const request: ChatCompletionRequest = {
    model: "gpt-4o-mini",
    store: true,
    messages: [
      {
        role: "user",
        content: `${prompt}\n\nTitle: ${title}\n\nContent:\n${content}`,
      },
    ],
  };

  const { data } = await openaiApi.post(ENDPOINTS.OPENAI_CHAT_COMPLETION, request);
  return data;
};
export const draftContent = async (
  title: string,
  content: string
): Promise<ChatCompletionResponse> => {
  const request: ChatCompletionRequest = {
    model: "gpt-4o-mini",
    store: true,
    messages: [
      {
        role: "user",
        content: `Create a detailed **first draft** of a report based on the following information. The title and rich text content include raw input and ideas. Use professional tone and report-like structure, including sections, bullet points if needed, and headings. Output should be in **markdown** format only (no HTML).\n\nTitle: ${title}\n\nInput Content:\n${content}`,
      },
    ],
  };

  const { data } = await openaiApi.post<ChatCompletionResponse>(
    ENDPOINTS.OPENAI_CHAT_COMPLETION,
    request
  );

  return data;
};