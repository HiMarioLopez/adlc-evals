"use client";

import { Check, Copy } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

// Lightweight syntax highlighting using regex patterns
// Much smaller than react-syntax-highlighter (~400KB -> ~5KB)

type TokenType =
  | "keyword"
  | "string"
  | "comment"
  | "number"
  | "function"
  | "operator"
  | "punctuation"
  | "variable"
  | "type"
  | "decorator";

interface Token {
  type: TokenType | null;
  content: string;
}

// Token patterns for common languages
const patterns: Record<string, { regex: RegExp; type: TokenType }[]> = {
  typescript: [
    { regex: /\/\/.*$/gm, type: "comment" },
    { regex: /\/\*[\s\S]*?\*\//g, type: "comment" },
    { regex: /(["'`])(?:(?!\1)[^\\]|\\.)*\1/g, type: "string" },
    {
      regex:
        /\b(import|export|from|const|let|var|function|return|if|else|for|while|class|extends|implements|interface|type|async|await|new|this|super|try|catch|throw|finally|typeof|instanceof|in|of|as|is)\b/g,
      type: "keyword",
    },
    { regex: /\b(true|false|null|undefined|void)\b/g, type: "keyword" },
    { regex: /\b([A-Z][a-zA-Z0-9]*)\b/g, type: "type" },
    { regex: /\b(\d+\.?\d*)\b/g, type: "number" },
    { regex: /([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g, type: "function" },
    { regex: /@[a-zA-Z_$][a-zA-Z0-9_$]*/g, type: "decorator" },
    { regex: /[{}[\]();,.:]/g, type: "punctuation" },
    { regex: /[+\-*/%=<>!&|^~?]/g, type: "operator" },
  ],
  python: [
    { regex: /#.*$/gm, type: "comment" },
    { regex: /"""[\s\S]*?"""|'''[\s\S]*?'''/g, type: "string" },
    { regex: /(["'])(?:(?!\1)[^\\]|\\.)*\1/g, type: "string" },
    {
      regex:
        /\b(import|from|def|class|return|if|elif|else|for|while|try|except|finally|with|as|async|await|yield|lambda|pass|break|continue|raise|and|or|not|in|is|True|False|None)\b/g,
      type: "keyword",
    },
    { regex: /\b([A-Z][a-zA-Z0-9]*)\b/g, type: "type" },
    { regex: /\b(\d+\.?\d*)\b/g, type: "number" },
    { regex: /([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g, type: "function" },
    { regex: /@[a-zA-Z_][a-zA-Z0-9_]*/g, type: "decorator" },
    { regex: /[{}[\]();,.:]/g, type: "punctuation" },
    { regex: /[+\-*/%=<>!&|^~]/g, type: "operator" },
  ],
  hcl: [
    { regex: /#.*$/gm, type: "comment" },
    { regex: /\/\/.*$/gm, type: "comment" },
    { regex: /(["'])(?:(?!\1)[^\\]|\\.)*\1/g, type: "string" },
    {
      regex: /\b(permit|deny|when|resource|principal|action|context|is)\b/g,
      type: "keyword",
    },
    { regex: /\b(true|false)\b/g, type: "keyword" },
    { regex: /\b([A-Z][a-zA-Z0-9:]*)\b/g, type: "type" },
    { regex: /\b(\d+\.?\d*)\b/g, type: "number" },
    { regex: /([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g, type: "function" },
    { regex: /[{}[\]();,.:]/g, type: "punctuation" },
    { regex: /[+\-*/%=<>!&|^~]/g, type: "operator" },
  ],
};

// Alias for javascript
patterns.javascript = patterns.typescript;

function tokenize(code: string, language: string): Token[] {
  const langPatterns = patterns[language] || patterns.typescript;
  const tokens: Token[] = [];

  // Simple approach: highlight in order of priority
  const _remaining = code;
  const _currentIndex = 0;

  // Find all matches with their positions
  interface Match {
    start: number;
    end: number;
    type: TokenType;
    content: string;
  }

  const matches: Match[] = [];

  for (const { regex, type } of langPatterns) {
    const re = new RegExp(regex.source, regex.flags);
    let match: RegExpExecArray | null;
    while ((match = re.exec(code)) !== null) {
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
        type,
        content: match[0],
      });
    }
  }

  // Sort by start position, then by length (longer matches first)
  matches.sort((a, b) => a.start - b.start || b.end - a.end);

  // Remove overlapping matches (keep first/longer ones)
  const nonOverlapping: Match[] = [];
  let lastEnd = 0;
  for (const m of matches) {
    if (m.start >= lastEnd) {
      nonOverlapping.push(m);
      lastEnd = m.end;
    }
  }

  // Build tokens
  let pos = 0;
  for (const m of nonOverlapping) {
    if (m.start > pos) {
      tokens.push({ type: null, content: code.slice(pos, m.start) });
    }
    tokens.push({ type: m.type, content: m.content });
    pos = m.end;
  }
  if (pos < code.length) {
    tokens.push({ type: null, content: code.slice(pos) });
  }

  return tokens;
}

const tokenColors: Record<TokenType, string> = {
  keyword: "text-[#c678dd]",
  string: "text-[#98c379]",
  comment: "text-[#5c6370] italic",
  number: "text-[#d19a66]",
  function: "text-[#61afef]",
  operator: "text-[#56b6c2]",
  punctuation: "text-[#abb2bf]",
  variable: "text-[#e06c75]",
  type: "text-[#e5c07b]",
  decorator: "text-[#c678dd]",
};

interface LightCodeBlockProps {
  code: string;
  language: string;
  className?: string;
}

export function LightCodeBlock({
  code,
  language,
  className,
}: LightCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  const tokens = useMemo(() => tokenize(code, language), [code, language]);

  return (
    <div className={cn("group relative", className)}>
      <button
        aria-label="Copy code"
        className="absolute top-3 right-3 z-10 rounded-lg bg-muted/80 p-2 opacity-0 transition-opacity hover:bg-muted group-hover:opacity-100"
        onClick={copyToClipboard}
      >
        {copied ? (
          <Check className="h-4 w-4 text-primary" />
        ) : (
          <Copy className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      <div className="overflow-x-auto">
        <pre
          className="m-0 bg-transparent p-5 font-mono text-[0.8125rem] leading-[1.7]"
          style={{
            fontFamily:
              "var(--font-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          <code>
            {tokens.map((token, i) =>
              token.type ? (
                <span className={tokenColors[token.type]} key={i}>
                  {token.content}
                </span>
              ) : (
                <span className="text-[#abb2bf]" key={i}>
                  {token.content}
                </span>
              )
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}
