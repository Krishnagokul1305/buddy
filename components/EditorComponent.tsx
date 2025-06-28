"use client";

import { useState, useEffect } from "react";
import type { SerializedEditorState } from "lexical";
import { Editor } from "@/components/blocks/editor-00/editor";

// Properly typed initial value
export const initialValue: SerializedEditorState = {
  root: {
    children: [
      {
        children: [],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
};

interface EditorComponentProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export default function EditorComponent({
  value = "",
  onChange,
  placeholder = "Start writing your note...",
}: EditorComponentProps) {
  const [editorState, setEditorState] =
    useState<SerializedEditorState>(initialValue);
  const [editorKey, setEditorKey] = useState(0); // Force remount when needed

  useEffect(() => {
    if (value && value !== "") {
      try {
        const parsedState = JSON.parse(value) as SerializedEditorState;
        setEditorState(parsedState);
        setEditorKey((prev) => prev + 1); // Force remount
      } catch {
        // If value is plain text, create a proper editor state
        const textState: SerializedEditorState = {
          root: {
            children: [
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: value,
                    type: "text",
                    version: 1,
                  },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                type: "paragraph",
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "root",
            version: 1,
          },
        };
        setEditorState(textState);
        setEditorKey((prev) => prev + 1); // Force remount
      }
    } else {
      setEditorState(initialValue);
      setEditorKey((prev) => prev + 1); // Force remount
    }
  }, [value]);

  const handleEditorChange = (newState: SerializedEditorState) => {
    setEditorState(newState);
    onChange?.(JSON.stringify(newState));
  };

  return (
    <div className="border rounded-md w-full">
      <Editor
        key={editorKey} // Force full re-render when key changes
        editorSerializedState={editorState}
        onSerializedChange={handleEditorChange}
      />
    </div>
  );
}
