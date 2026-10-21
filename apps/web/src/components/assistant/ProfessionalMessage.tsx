import React from 'react';
import { ShieldCheck, Info, CheckCircle2, ChevronRight, Terminal } from 'lucide-react';

interface Props {
  content: string;
  isUser: boolean;
}

export const ProfessionalMessage: React.FC<Props> = ({ content, isUser }) => {
  if (isUser) {
    return <div className="font-sans text-sm font-medium leading-relaxed">{content}</div>;
  }

  // Helper to parse inline styles (bold, code, links)
  const renderInline = (text: string) => {
    // Regex matches **bold**, `code`, or regular text
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);

    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={idx} className="font-bold text-ink dark:text-paper">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code
            key={idx}
            className="px-1.5 py-0.5 mx-0.5 rounded font-mono text-[11px] font-semibold bg-saffron/15 text-saffron dark:text-saffron border border-saffron/30"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      return <React.Fragment key={idx}>{part}</React.Fragment>;
    });
  };

  // Split content into clean block lines
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];

  let currentList: { num?: string; title?: string; body: string }[] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <div key={`list-${elements.length}`} className="my-2 space-y-2">
          {currentList.map((item, i) => (
            <div
              key={i}
              className="p-3 rounded-xl bg-paper/60 dark:bg-ink/60 border border-paper-border/60 dark:border-ink-border/60 flex items-start gap-3 text-xs leading-relaxed transition-colors hover:border-saffron/40"
            >
              {item.num ? (
                <span className="w-6 h-6 rounded-lg bg-saffron/15 text-saffron border border-saffron/30 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                  {item.num}
                </span>
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-saffron shrink-0 mt-2" />
              )}
              <div className="flex-1 font-sans text-neutral-800 dark:text-neutral-200">
                {renderInline(item.body)}
              </div>
            </div>
          ))}
        </div>
      );
      currentList = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) {
      flushList();
      continue;
    }

    // Numbered list item: e.g. "1. **Title:** description"
    const numberedMatch = line.match(/^(\d+)\.\s+(.*)$/);
    if (numberedMatch) {
      const numStr = String(numberedMatch[1]).padStart(2, '0');
      currentList.push({
        num: numStr,
        body: numberedMatch[2]
      });
      continue;
    }

    // Bullet list item: e.g. "- Title" or "* Title"
    const bulletMatch = line.match(/^[-*]\s+(.*)$/);
    if (bulletMatch) {
      currentList.push({
        body: bulletMatch[1]
      });
      continue;
    }

    flushList();

    // Headers: e.g. "### Header" or "## Header"
    if (line.startsWith('### ') || line.startsWith('## ') || line.startsWith('# ')) {
      const cleanHeader = line.replace(/^#+\s+/, '');
      elements.push(
        <div key={`header-${i}`} className="mt-4 mb-2 pb-1 border-b border-paper-border dark:border-ink-border flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-saffron shrink-0" />
          <h4 className="font-serif font-bold text-sm tracking-tight text-ink dark:text-paper">
            {renderInline(cleanHeader)}
          </h4>
        </div>
      );
      continue;
    }

    // Callout / Alert blocks: lines starting with ⚠️, ⚡, or Note:
    if (line.startsWith('⚠️') || line.startsWith('⚡') || line.startsWith('Notice:') || line.startsWith('Important:')) {
      elements.push(
        <div
          key={`alert-${i}`}
          className="my-2.5 p-3 rounded-xl bg-saffron/10 border border-saffron/30 text-xs font-mono flex items-start gap-2.5 text-neutral-800 dark:text-neutral-200"
        >
          <Info className="w-4 h-4 text-saffron shrink-0 mt-0.5" />
          <div className="flex-1 font-sans leading-relaxed">{renderInline(line)}</div>
        </div>
      );
      continue;
    }

    // Standard paragraph
    elements.push(
      <p key={`p-${i}`} className="my-1.5 font-sans text-xs leading-relaxed text-neutral-800 dark:text-neutral-200">
        {renderInline(line)}
      </p>
    );
  }

  flushList();

  return <div className="space-y-1">{elements}</div>;
};
