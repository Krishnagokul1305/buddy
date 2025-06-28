"use client";

import { useState } from "react";

import { ListItemNode, ListNode } from "@lexical/list";

import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";

import {
  type InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";

import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

import { ListPlugin } from "@lexical/react/LexicalListPlugin";

import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

import { HeadingNode, QuoteNode } from "@lexical/rich-text";

import {
  type EditorState,
  ParagraphNode,
  type SerializedEditorState,
  TextNode,
} from "lexical";

import { TooltipProvider } from "@/components/ui/tooltip";

import { editorTheme } from "@/components/editor/themes/editor-theme";

import { ToolbarPlugin } from "@/components/editor/plugins/toolbar/toolbar-plugin";

import { BlockFormatDropDown } from "@/components/editor/plugins/toolbar/block-format-toolbar-plugin";

import { FormatParagraph } from "@/components/editor/plugins/toolbar/block-format/format-paragraph";

import { FormatHeading } from "@/components/editor/plugins/toolbar/block-format/format-heading";

import { FormatNumberedList } from "@/components/editor/plugins/toolbar/block-format/format-numbered-list";

import { FormatBulletedList } from "@/components/editor/plugins/toolbar/block-format/format-bulleted-list";

import { FormatCheckList } from "@/components/editor/plugins/toolbar/block-format/format-check-list";

import { FormatQuote } from "@/components/editor/plugins/toolbar/block-format/format-quote";

import { ContentEditable } from "@/components/editor/editor-ui/content-editable";

import { ElementFormatToolbarPlugin } from "@/components/editor/plugins/toolbar/element-format-toolbar-plugin";

import { FontColorToolbarPlugin } from "@/components/editor/plugins/toolbar/font-color-toolbar-plugin";

const editorConfig: InitialConfigType = {
  namespace: "Editor",
  theme: editorTheme,
  nodes: [
    HeadingNode,
    ParagraphNode,
    TextNode,
    QuoteNode,
    ListNode,
    ListItemNode,
  ],
  onError: (error: Error) => {
    console.error(error);
  },
};

export function Editor({
  editorState,
  editorSerializedState,
  onChange,
  onSerializedChange,
}: {
  editorState?: EditorState;
  editorSerializedState?: SerializedEditorState;
  onChange?: (editorState: EditorState) => void;
  onSerializedChange?: (editorSerializedState: SerializedEditorState) => void;
}) {
  return (
    <div className="bg-background w-full overflow-hidden rounded-lg border">
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
          editorState: (editor) => {
            if (editorSerializedState) {
              const parsedState = editor.parseEditorState(
                editorSerializedState
              );
              editor.setEditorState(parsedState);
            }
          },
        }}
      >
        <TooltipProvider>
          <Plugins
            onChange={onChange}
            onSerializedChange={onSerializedChange}
          />
        </TooltipProvider>
      </LexicalComposer>
    </div>
  );
}

const placeholder = "Start typing...";

export function Plugins({
  onChange,
  onSerializedChange,
}: {
  onChange?: (editorState: EditorState) => void;
  onSerializedChange?: (editorSerializedState: SerializedEditorState) => void;
}) {
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  const handleEditorChange = (editorState: EditorState) => {
    // Call the onChange callback if provided
    if (onChange) {
      onChange(editorState);
    }

    // Call the onSerializedChange callback if provided
    if (onSerializedChange) {
      const serializedState = editorState.toJSON();
      onSerializedChange(serializedState);
    }
  };

  return (
    <div className="relative">
      <ToolbarPlugin>
        {({ blockType }) => (
          <div className="sticky top-0 z-10 w-full border-b bg-background">
            <div className="flex overflow-x-auto p-1 gap-1 scrollbar-hide">
              <div className="flex items-center gap-1 flex-shrink-0">
                <BlockFormatDropDown>
                  <FormatParagraph />
                  <FormatHeading levels={["h1", "h2", "h3"]} />
                  <FormatNumberedList />
                  <FormatBulletedList />
                  <FormatCheckList />
                  <FormatQuote />
                </BlockFormatDropDown>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <ElementFormatToolbarPlugin />
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <FontColorToolbarPlugin />
              </div>
            </div>
          </div>
        )}
      </ToolbarPlugin>

      <div className="relative">
        <RichTextPlugin
          contentEditable={
            <div ref={onRef}>
              <ContentEditable
                placeholder={placeholder}
                className="ContentEditable__root relative block min-h-72 overflow-auto px-4 sm:px-8 py-4 focus:outline-none"
              />
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />

        <OnChangePlugin onChange={handleEditorChange} />
        <ListPlugin />
        <CheckListPlugin />
      </div>
    </div>
  );
}
