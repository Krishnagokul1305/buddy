"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { EditorState, SerializedEditorState } from "lexical";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { ParagraphNode, TextNode } from "lexical";

import { editorTheme } from "@/components/editor/themes/editor-theme";

const viewerConfig = (
  editorSerializedState: SerializedEditorState
): Parameters<typeof LexicalComposer>[0]["initialConfig"] => ({
  namespace: "Viewer",
  theme: editorTheme,
  editable: false, // 👈 Important
  editorState: (editor) => {
    const state = editor.parseEditorState(editorSerializedState);
    editor.setEditorState(state);
  },
  nodes: [
    HeadingNode,
    ParagraphNode,
    TextNode,
    QuoteNode,
    ListNode,
    ListItemNode,
  ],
  onError: (error) => {
    console.error("Viewer Error:", error);
  },
});

export function ContentViewer({ value }: { value: SerializedEditorState }) {
  return (
    <LexicalComposer initialConfig={viewerConfig(value)}>
      <div className="bg-background w-full overflow-hidden rounded-lg">
        <ContentEditable className="prose prose-slate dark:prose-invert max-w-none focus:outline-none" />
      </div>
    </LexicalComposer>
  );
}
