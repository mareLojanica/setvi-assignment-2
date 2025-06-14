import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import type { MarkdownRendererProps } from "../../types/types";

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => (
  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
    {content}
  </ReactMarkdown>
);

export default MarkdownRenderer;
