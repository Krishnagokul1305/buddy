"use client";

import { cn } from "@/lib/utils";
import MarkdownIt from "markdown-it";

const mdParser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

function MarkDownPreviewer({
  content,
  height = 600,
}: {
  content: string;
  height?: number;
}) {
  return (
    <div
      className={cn(
        "w-full rounded-lg bg-background overflow-auto",
        "prose prose-slate dark:prose-invert max-w-none",
        "prose-headings:font-bold prose-headings:tracking-tight",
        "prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-0 prose-h1:border-b prose-h1:pb-2",
        "prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8",
        "prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6",
        "prose-h4:text-lg prose-h4:mb-2 prose-h4:mt-4",
        "prose-p:text-foreground prose-p:leading-7 prose-p:mb-4",
        "prose-strong:text-foreground prose-strong:font-semibold",
        "prose-em:text-foreground prose-em:italic",
        "prose-a:text-blue-600 dark:prose-a:text-blue-400",
        "prose-a:underline prose-a:decoration-blue-600/30",
        "hover:prose-a:decoration-blue-600",
        "prose-ul:my-4 prose-ul:pl-6",
        "prose-ol:my-4 prose-ol:pl-6",
        "prose-li:my-1 prose-li:text-foreground",
        "prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5",
        "prose-code:rounded prose-code:text-sm prose-code:font-mono",
        "prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none",
        "prose-pre:bg-muted prose-pre:border prose-pre:rounded-lg",
        "prose-pre:p-4 prose-pre:overflow-x-auto prose-pre:text-sm",
        "prose-pre:text-foreground",
        // Blockquotes
        "prose-blockquote:border-l-4 prose-blockquote:border-border",
        "prose-blockquote:pl-4 prose-blockquote:italic",
        "prose-blockquote:text-muted-foreground prose-blockquote:my-4",
        // Tables
        "prose-table:w-full prose-table:border-collapse prose-table:my-4",
        "prose-th:border prose-th:border-border prose-th:bg-muted/50",
        "prose-th:px-3 prose-th:py-2 prose-th:text-left prose-th:font-semibold",
        "prose-td:border prose-td:border-border prose-td:px-3 prose-td:py-2",
        "prose-th:text-foreground prose-td:text-foreground",
        "prose-hr:border-border prose-hr:my-8",
        "prose-img:rounded-lg prose-img:shadow-sm"
      )}
      style={{ height: `${height}px` }}
      dangerouslySetInnerHTML={{
        __html: mdParser.render(content),
      }}
    />
  );
}

export default MarkDownPreviewer;
