// Enhance the markdown parser to better handle code blocks and syntax highlighting

import Prism from "prismjs"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-python"
import "prismjs/components/prism-java"
import "prismjs/components/prism-c"
import "prismjs/components/prism-cpp"
import "prismjs/components/prism-csharp"
import "prismjs/components/prism-markup"
import "prismjs/components/prism-css"
import "prismjs/components/prism-sql"
import "prismjs/components/prism-bash"

export const parseMarkdown = (markdown: string): string => {
  // This is a more comprehensive implementation
  let html = markdown
    // Replace headers
    .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold my-4">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold my-3">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold my-2">$1</h3>')
    .replace(/^#### (.*$)/gm, '<h4 class="text-base font-bold my-2">$1</h4>')

    // Replace bold and italic
    .replace(/\*\*(.*?)\*\*/gm, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/gm, "<em>$1</em>")
    .replace(/__(.*?)__/gm, "<strong>$1</strong>")
    .replace(/_(.*?)_/gm, "<em>$1</em>")

    // Replace links
    .replace(
      /\[([^\]]+)\]$$([^)]+)$$/gm,
      '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>',
    )

    // Replace unordered lists
    .replace(/^\s*[*-]\s+(.*$)/gm, '<li class="ml-4">$1</li>')

    // Replace ordered lists
    .replace(/^\s*(\d+)\.\s+(.*$)/gm, '<li class="ml-4">$2</li>')

    // Replace horizontal rules
    .replace(/^---$/gm, '<hr class="my-4 border-t border-muted" />')

    // Replace blockquotes
    .replace(
      /^>\s+(.*$)/gm,
      '<blockquote class="pl-4 border-l-4 border-muted-foreground/30 italic my-2">$1</blockquote>',
    )

    // Replace inline code
    .replace(/`([^`]+)`/gm, '<code class="bg-muted px-1 py-0.5 rounded text-sm font-mono">$1</code>')

  // Handle code blocks with language specification
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/gm, (match, lang, code) => {
    const language = lang || "markup"
    let highlighted

    try {
      highlighted = Prism.highlight(code.trim(), Prism.languages[language] || Prism.languages.markup, language)
    } catch (e) {
      highlighted = code
    }

    return `<pre class="bg-muted p-4 rounded-md overflow-x-auto my-4"><code class="language-${language} font-mono text-sm">${highlighted}</code></pre>`
  })

  // Replace paragraphs (must be done last to avoid interfering with other elements)
  html = html.replace(/^(?!<[a-z]).+$/gm, '<p class="my-2">$&</p>')

  // Fix list items by wrapping them in ul/ol tags
  html = html.replace(
    /<li class="ml-4">(.*?)<\/li>(\s*<li class="ml-4">.*?<\/li>)*/g,
    '<ul class="list-disc my-4">$&</ul>',
  )

  return html
}

// Function to detect if content is markdown
export const isMarkdown = (content: string): boolean => {
  const markdownPatterns = [
    /^#\s+.+$/m, // Headers
    /\*\*.+\*\*/, // Bold
    /\*.+\*/, // Italic
    /\[.+\]$$.+$$/, // Links
    /^\s*[*-]\s+.+$/m, // Unordered lists
    /^\s*\d+\.\s+.+$/m, // Ordered lists
    /^>\s+.+$/m, // Blockquotes
    /`[^`]+`/, // Inline code
    /```[\s\S]*?```/, // Code blocks
  ]

  return markdownPatterns.some((pattern) => pattern.test(content))
}
