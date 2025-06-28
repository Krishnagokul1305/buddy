import type { SerializedEditorState } from "lexical"

// Utility function to extract plain text from editor state for search/preview
export function extractTextFromEditorState(editorState: string): string {
  try {
    const parsed: SerializedEditorState = JSON.parse(editorState)

    function extractTextFromNode(node: any): string {
      if (node.type === "text") {
        return node.text || ""
      }

      if (node.children && Array.isArray(node.children)) {
        return node.children.map(extractTextFromNode).join("")
      }

      return ""
    }

    if (parsed.root && parsed.root.children) {
      return parsed.root.children.map(extractTextFromNode).join("\n")
    }

    return ""
  } catch {
    return editorState // Return as-is if not valid JSON
  }
}

// Utility function to check if content is Lexical JSON
export function isLexicalContent(content: string): boolean {
  try {
    const parsed = JSON.parse(content)
    return parsed.root && parsed.root.type === "root"
  } catch {
    return false
  }
}

// Utility function to create editor state from plain text
export function createEditorStateFromText(text: string): string {
  const editorState = {
    root: {
      children: text.split("\n").map((line) => ({
        children: line
          ? [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: line,
                type: "text",
                version: 1,
              },
            ]
          : [],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      })),
      direction: "ltr",
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  }

  return JSON.stringify(editorState)
}
