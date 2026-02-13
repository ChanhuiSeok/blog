"use client";

import { useEffect, useRef, useCallback } from "react";
import { EditorView, keymap, placeholder } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import {
  defaultKeymap,
  indentWithTab,
  history,
  historyKeymap,
} from "@codemirror/commands";
import {
  syntaxHighlighting,
  defaultHighlightStyle,
  bracketMatching,
} from "@codemirror/language";
import { oneDark } from "@codemirror/theme-one-dark";
import { useTheme } from "next-themes";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  onUploadImage?: () => void;
}

type ToolbarAction =
  | "bold"
  | "italic"
  | "heading"
  | "link"
  | "image"
  | "code"
  | "quote";

const TOOLBAR_ITEMS: { action: ToolbarAction; label: string; icon: string }[] =
  [
    { action: "bold", label: "Bold", icon: "B" },
    { action: "italic", label: "Italic", icon: "I" },
    { action: "heading", label: "Heading", icon: "H" },
    { action: "link", label: "Link", icon: "🔗" },
    { action: "image", label: "Image", icon: "🖼" },
    { action: "code", label: "Code", icon: "</>" },
    { action: "quote", label: "Quote", icon: "❝" },
  ];

function wrapSelection(
  view: EditorView,
  before: string,
  after: string,
  placeholder_text: string,
) {
  const { from, to } = view.state.selection.main;
  const selected = view.state.sliceDoc(from, to);
  const text = selected || placeholder_text;
  view.dispatch({
    changes: { from, to, insert: `${before}${text}${after}` },
    selection: {
      anchor: from + before.length,
      head: from + before.length + text.length,
    },
  });
  view.focus();
}

function insertAtLineStart(
  view: EditorView,
  prefix: string,
  placeholder_text: string,
) {
  const { from } = view.state.selection.main;
  const line = view.state.doc.lineAt(from);
  const selected = view.state.sliceDoc(line.from, line.to);
  if (selected) {
    view.dispatch({
      changes: { from: line.from, to: line.to, insert: `${prefix}${selected}` },
    });
  } else {
    view.dispatch({
      changes: { from: line.from, to: line.to, insert: `${prefix}${placeholder_text}` },
      selection: {
        anchor: line.from + prefix.length,
        head: line.from + prefix.length + placeholder_text.length,
      },
    });
  }
  view.focus();
}

export function MarkdownEditor({
  value,
  onChange,
  onUploadImage,
}: MarkdownEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const onChangeRef = useRef(onChange);
  const { resolvedTheme } = useTheme();

  onChangeRef.current = onChange;

  const handleToolbar = useCallback((action: ToolbarAction) => {
    const view = viewRef.current;
    if (!view) return;

    switch (action) {
      case "bold":
        wrapSelection(view, "**", "**", "bold text");
        break;
      case "italic":
        wrapSelection(view, "*", "*", "italic text");
        break;
      case "heading":
        insertAtLineStart(view, "## ", "Heading");
        break;
      case "link":
        wrapSelection(view, "[", "](url)", "link text");
        break;
      case "image":
        wrapSelection(view, "![", "](url)", "alt text");
        break;
      case "code":
        wrapSelection(view, "`", "`", "code");
        break;
      case "quote":
        insertAtLineStart(view, "> ", "quote");
        break;
    }
  }, []);

  // Create editor
  useEffect(() => {
    if (!containerRef.current) return;

    const isDark = resolvedTheme === "dark";

    const extensions = [
      markdown({ base: markdownLanguage, codeLanguages: languages }),
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      bracketMatching(),
      history(),
      keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
      placeholder("Write your markdown here..."),
      EditorView.lineWrapping,
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          onChangeRef.current(update.state.doc.toString());
        }
      }),
      EditorView.theme({
        "&": {
          height: "100%",
          fontSize: "14px",
        },
        ".cm-scroller": {
          overflow: "auto",
          fontFamily: "var(--font-mono)",
        },
        ".cm-content": {
          padding: "16px 0",
        },
        ".cm-gutters": {
          display: "none",
        },
      }),
    ];

    if (isDark) {
      extensions.push(oneDark);
    }

    const state = EditorState.create({
      doc: value,
      extensions,
    });

    const view = new EditorView({
      state,
      parent: containerRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
    // Recreate editor when theme changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedTheme]);

  // Sync external value changes
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;

    const currentValue = view.state.doc.toString();
    if (value !== currentValue) {
      view.dispatch({
        changes: { from: 0, to: currentValue.length, insert: value },
      });
    }
  }, [value]);

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 border-b border-border bg-muted/50 px-2 py-1.5">
        {TOOLBAR_ITEMS.map((item) => (
          <button
            key={item.action}
            type="button"
            onClick={() => handleToolbar(item.action)}
            title={item.label}
            className="rounded px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {item.icon}
          </button>
        ))}
        {onUploadImage && (
          <>
            <div className="mx-1 h-4 w-px bg-border" />
            <button
              type="button"
              onClick={onUploadImage}
              title="Upload Image"
              className="rounded px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Upload
            </button>
          </>
        )}
      </div>
      {/* Editor */}
      <div ref={containerRef} className="min-h-0 flex-1 overflow-auto" />
    </div>
  );
}
