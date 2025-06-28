"use client";

import type { SerializedEditorState } from "lexical";
import type React from "react"; // Import React to declare JSX

interface SimpleContentRendererProps {
  content: string;
  className?: string;
  maxLength?: number;
}

export function SimpleContentRenderer({
  content,
  className = "",
  maxLength,
}: SimpleContentRendererProps) {
  let remainingLength = typeof maxLength === "number" ? maxLength : Infinity;

  const renderContent = () => {
    try {
      const parsed: SerializedEditorState = JSON.parse(content);
      return renderNodes(parsed.root.children);
    } catch (error) {
      const textContent = content.slice(0, maxLength);
      return <p className="mb-4">{textContent}</p>;
    }
  };

  const renderNodes = (nodes: any[]): React.ReactNode => {
    return nodes.map((node, index) => renderNode(node, index)).filter(Boolean); // remove nulls
  };

  const renderNode = (node: any, index: number): React.ReactNode => {
    if (remainingLength <= 0) return null;

    switch (node.type) {
      case "paragraph":
        return (
          <p key={index} className="mb-4">
            {node.children ? renderNodes(node.children) : ""}
          </p>
        );

      case "heading":
        const HeadingTag = `h${node.tag}` as keyof JSX.IntrinsicElements;
        const headingClasses = {
          h1: "text-3xl font-bold mb-6 mt-8",
          h2: "text-2xl font-semibold mb-4 mt-6",
          h3: "text-xl font-medium mb-3 mt-4",
          h4: "text-lg font-medium mb-2 mt-3",
          h5: "text-base font-medium mb-2 mt-2",
          h6: "text-sm font-medium mb-2 mt-2",
        };
        return (
          <HeadingTag
            key={index}
            className={
              headingClasses[node.tag as keyof typeof headingClasses] || ""
            }
          >
            {node.children ? renderNodes(node.children) : ""}
          </HeadingTag>
        );

      case "list":
        const ListTag = node.listType === "number" ? "ol" : "ul";
        const listClasses =
          node.listType === "number"
            ? "list-decimal list-inside mb-4 ml-4"
            : "list-disc list-inside mb-4 ml-4";
        return (
          <ListTag key={index} className={listClasses}>
            {node.children ? renderNodes(node.children) : ""}
          </ListTag>
        );

      case "listitem":
        return (
          <li key={index} className="mb-1">
            {node.children ? renderNodes(node.children) : ""}
          </li>
        );

      case "quote":
        return (
          <blockquote
            key={index}
            className="border-l-4 border-gray-300 pl-4 italic mb-4 text-gray-700 dark:text-gray-300"
          >
            {node.children ? renderNodes(node.children) : ""}
          </blockquote>
        );

      case "text":
        const fullText = node.text || "";
        if (remainingLength <= 0) return null;

        let displayedText = fullText;
        if (fullText.length > remainingLength) {
          displayedText = fullText.slice(0, remainingLength);
        }
        remainingLength -= displayedText.length;

        let className = "";
        if (node.format) {
          if (node.format & 1) className += " font-bold";
          if (node.format & 2) className += " italic";
          if (node.format & 4) className += " underline";
          if (node.format & 8) className += " line-through";
        }

        if (node.style) {
          const colorMatch = node.style.match(/color:\s*([^;]+)/);
          if (colorMatch) {
            return (
              <span
                key={index}
                className={className}
                style={{ color: colorMatch[1] }}
              >
                {displayedText}
              </span>
            );
          }
        }

        return className ? (
          <span key={index} className={className}>
            {displayedText}
          </span>
        ) : (
          displayedText
        );

      case "linebreak":
        return <br key={index} />;

      default:
        return node.children ? (
          <span key={index}>{renderNodes(node.children)}</span>
        ) : null;
    }
  };

  return (
    <div
      className={`prose prose-slate dark:prose-invert max-w-none ${className}`}
    >
      {renderContent()}
    </div>
  );
}
