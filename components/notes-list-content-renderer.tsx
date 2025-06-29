"use client"

interface NotesListContentRendererProps {
  content: string
  maxLength?: number
  className?: string
}

export function NotesListContentRenderer({ content, maxLength = 150, className = "" }: NotesListContentRendererProps) {
  const extractPlainText = (content: string): string => {
    try {
      const parsed = JSON.parse(content)

      const extractTextFromNodes = (nodes: any[]): string => {
        return nodes
          .map((node) => {
            if (node.type === "text") {
              return node.text || ""
            }
            if (node.children && Array.isArray(node.children)) {
              return extractTextFromNodes(node.children)
            }
            return ""
          })
          .join("")
      }

      if (parsed.root && parsed.root.children) {
        const text = parsed.root.children
          .map((node: any) => {
            if (node.children) {
              return extractTextFromNodes(node.children)
            }
            return ""
          })
          .join(" ")

        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
      }

      return ""
    } catch {
      // If parsing fails, treat as plain text
      return content.length > maxLength ? content.substring(0, maxLength) + "..." : content
    }
  }

  const plainText = extractPlainText(content)

  return <p className={`text-muted-foreground ${className}`}>{plainText || "No content"}</p>
}
