"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, Check, FileText, Edit3, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface MarkdownEditorProps {
  value?: string;
  className?: string;
  onChange?: (value: string) => void;
  height?: number;
}

import MarkdownIt from "markdown-it";
import MarkDownPreviewer from "./MarkDownPreviewer";

const mdParser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

export function MarkdownEditor({
  value = "",
  onChange,
  className,
  height = 600,
}: MarkdownEditorProps) {
  const [content, setContent] = useState(value);
  const [isCopied, setIsCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("editor");

  const handleContentChange = (value: string) => {
    setContent(value);
    if (onChange) onChange(value);
  };

  const handleExportMd = () => {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `document-${new Date().toISOString().split("T")[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className={cn("w-full h-full", className)}>
      <Card className="h-full flex flex-col border-none">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="h-full flex flex-col"
        >
          <div className="px-2 border-b flex-shrink-0">
            <TabsList className="grid w-full max-w-md grid-cols-2 bg-transparent h-12 p-0 border-0">
              <TabsTrigger
                value="editor"
                className="gap-2 bg-transparent border-0 rounded-none h-full px-4 text-muted-foreground hover:text-foreground data-[state=active]:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none relative data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-foreground transition-colors"
              >
                <Edit3 className="h-4 w-4" />
                Editor
              </TabsTrigger>
              <TabsTrigger
                value="preview"
                className="gap-2 bg-transparent border-0 rounded-none h-full px-4 text-muted-foreground hover:text-foreground data-[state=active]:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none relative data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-foreground transition-colors"
              >
                <Eye className="h-4 w-4" />
                Preview
              </TabsTrigger>
            </TabsList>
          </div>

          <div>
            <TabsContent value="editor" className="mt-0 h-full">
              <div className="h-full">
                <Textarea
                  value={content}
                  onChange={(e) => handleContentChange(e.target.value)}
                  placeholder="Start writing your markdown here..."
                  className={cn(
                    "w-full resize-none border rounded-lg p-4 font-mono text-sm leading-relaxed",
                    "focus:ring-2 focus:ring-ring focus:border-ring",
                    "bg-background text-foreground placeholder:text-muted-foreground"
                  )}
                  style={{ height: `${height}px` }}
                />
              </div>
            </TabsContent>

            <TabsContent
              value="preview"
              className="mt-0 h-full border p-4 rounded-lg"
            >
              <MarkDownPreviewer content={content} />
            </TabsContent>
          </div>
        </Tabs>
      </Card>
    </div>
  );
}

{
  /* <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="gap-2 bg-transparent"
            >
              {isCopied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleExportMd}
              className="gap-2 bg-transparent"
            >
              <Download className="h-4 w-4" />
              Export MD
            </Button>
          </div> */
}
