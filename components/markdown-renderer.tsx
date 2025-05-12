"use client"

import { useEffect, useState } from "react"
import { parseMarkdown, isMarkdown } from "@/lib/markdown"
import { Card } from "@/components/ui/card"

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  const [renderedContent, setRenderedContent] = useState("")

  useEffect(() => {
    // Only parse as markdown if it looks like markdown
    if (isMarkdown(content)) {
      setRenderedContent(parseMarkdown(content))
    } else {
      setRenderedContent(`<p>${content.replace(/\n/g, "<br/>")}</p>`)
    }
  }, [content])

  return (
    <div
      className={`prose dark:prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedContent }}
    />
  )
}

export function MarkdownPreview({ content }: { content: string }) {
  const [renderedContent, setRenderedContent] = useState("")

  useEffect(() => {
    if (isMarkdown(content)) {
      setRenderedContent(parseMarkdown(content))
    } else {
      setRenderedContent(`<p>${content.replace(/\n/g, "<br/>")}</p>`)
    }
  }, [content])

  return (
    <Card className="p-4 mt-4 animate-fade-in">
      <h3 className="text-sm font-medium mb-2 text-muted-foreground">Preview</h3>
      <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: renderedContent }} />
    </Card>
  )
}
