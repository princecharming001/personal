"use client";

import {
  Bold,
  Heading2,
  Heading3,
  Italic,
  Link,
  Link2Off,
  List,
  ListOrdered,
  Pilcrow,
  Redo2,
  RemoveFormatting,
  Strikethrough,
  Underline,
  Undo2,
} from "lucide-react";
import { getTargetDocument } from "@/lib/admin-page-target";

type Props = { active: boolean };

function runCommand(cmd: string, value?: string) {
  const doc = getTargetDocument();
  if (!doc) return;
  try {
    doc.execCommand(cmd, false, value);
  } catch {
    /* ignore — execCommand is deprecated but still best undo stack for designMode */
  }
}

function queryState(cmd: string): boolean {
  const doc = getTargetDocument();
  if (!doc) return false;
  try {
    return doc.queryCommandState(cmd);
  } catch {
    return false;
  }
}

function TbButton({
  title,
  pressed,
  onTrigger,
  children,
}: {
  title: string;
  pressed?: boolean;
  onTrigger: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      aria-pressed={pressed}
      /* Keep text selection in the page when using the toolbar */
      onMouseDown={(e) => e.preventDefault()}
      onClick={onTrigger}
      className={`
        inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border text-gray-700 transition-colors
        ${pressed
          ? "border-[#7C3AED] bg-[#7C3AED]/10 text-[#5B21B6]"
          : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
        }
      `}
    >
      {children}
    </button>
  );
}

export default function AdminVisualToolbar({ active }: Props) {
  if (!active) return null;

  const bold = queryState("bold");
  const italic = queryState("italic");
  const underline = queryState("underline");
  const strike = queryState("strikeThrough");
  const ul = queryState("insertUnorderedList");
  const ol = queryState("insertOrderedList");

  return (
    <div
      role="toolbar"
      aria-label="Formatting"
      data-admin-ui="toolbar"
      className="fixed top-3 left-1/2 z-[210] flex max-w-[min(96vw,680px)] -translate-x-1/2 flex-wrap items-center justify-center gap-1 rounded-xl border border-gray-200 bg-white/95 px-2 py-2 shadow-lg backdrop-blur-sm"
    >
      <TbButton title="Bold (⌘B)" pressed={bold} onTrigger={() => runCommand("bold")}>
        <Bold className="h-4 w-4" strokeWidth={2.25} />
      </TbButton>
      <TbButton title="Italic (⌘I)" pressed={italic} onTrigger={() => runCommand("italic")}>
        <Italic className="h-4 w-4" strokeWidth={2.25} />
      </TbButton>
      <TbButton
        title="Underline (⌘U)"
        pressed={underline}
        onTrigger={() => runCommand("underline")}
      >
        <Underline className="h-4 w-4" strokeWidth={2.25} />
      </TbButton>
      <TbButton
        title="Strikethrough"
        pressed={strike}
        onTrigger={() => runCommand("strikeThrough")}
      >
        <Strikethrough className="h-4 w-4" strokeWidth={2.25} />
      </TbButton>

      <span className="mx-1 hidden h-6 w-px bg-gray-200 sm:block" aria-hidden />

      <TbButton title="Heading 2" onTrigger={() => runCommand("formatBlock", "h2")}>
        <Heading2 className="h-4 w-4" strokeWidth={2.25} />
      </TbButton>
      <TbButton title="Heading 3" onTrigger={() => runCommand("formatBlock", "h3")}>
        <Heading3 className="h-4 w-4" strokeWidth={2.25} />
      </TbButton>
      <TbButton title="Paragraph" onTrigger={() => runCommand("formatBlock", "p")}>
        <Pilcrow className="h-4 w-4" strokeWidth={2.25} />
      </TbButton>

      <span className="mx-1 hidden h-6 w-px bg-gray-200 sm:block" aria-hidden />

      <TbButton title="Bullet list" pressed={ul} onTrigger={() => runCommand("insertUnorderedList")}>
        <List className="h-4 w-4" strokeWidth={2.25} />
      </TbButton>
      <TbButton title="Numbered list" pressed={ol} onTrigger={() => runCommand("insertOrderedList")}>
        <ListOrdered className="h-4 w-4" strokeWidth={2.25} />
      </TbButton>

      <span className="mx-1 hidden h-6 w-px bg-gray-200 sm:block" aria-hidden />

      <TbButton
        title="Insert link"
        onTrigger={() => {
          const raw = window.prompt("Link URL", "https://");
          if (!raw) return;
          const url = raw.trim();
          if (!url) return;
          runCommand("createLink", url);
        }}
      >
        <Link className="h-4 w-4" strokeWidth={2.25} />
      </TbButton>
      <TbButton title="Remove link" onTrigger={() => runCommand("unlink")}>
        <Link2Off className="h-4 w-4" strokeWidth={2.25} />
      </TbButton>
      <TbButton title="Clear formatting" onTrigger={() => runCommand("removeFormat")}>
        <RemoveFormatting className="h-4 w-4" strokeWidth={2.25} />
      </TbButton>

      <span className="mx-1 hidden h-6 w-px bg-gray-200 sm:block" aria-hidden />

      <TbButton title="Undo (⌘Z)" onTrigger={() => runCommand("undo")}>
        <Undo2 className="h-4 w-4" strokeWidth={2.25} />
      </TbButton>
      <TbButton title="Redo (⌘⇧Z)" onTrigger={() => runCommand("redo")}>
        <Redo2 className="h-4 w-4" strokeWidth={2.25} />
      </TbButton>
    </div>
  );
}
