"use client";

import { useEffect, useRef, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import { Markdown } from "tiptap-markdown";
import { common, createLowlight } from "lowlight";
import type { Editor } from "@tiptap/react";

declare module "@tiptap/core" {
  interface Storage {
    markdown: {
      getMarkdown: () => string;
    };
  }
}

const lowlight = createLowlight(common);

interface TiptapEditorProps {
  value: string;
  onChange: (value: string) => void;
  onUploadImage?: () => void;
  uploading?: boolean;
  onEditorReady?: (editor: Editor) => void;
}

function EditorToolbar({
  editor,
  onUploadImage,
  uploading,
}: {
  editor: Editor | null;
  onUploadImage?: () => void;
  uploading?: boolean;
}) {
  if (!editor) return null;

  const btnClass = (active: boolean) =>
    `rounded-md px-2 py-1.5 text-xs font-medium transition-all ${
      active
        ? "bg-accent/15 text-accent"
        : "text-muted-foreground hover:bg-muted hover:text-foreground"
    }`;

  const divider = (
    <span className="mx-0.5 h-5 w-px bg-border" />
  );

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-border px-3 py-1.5">
      {/* Headings */}
      {([1, 2, 3] as const).map((level) => (
        <button
          key={level}
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level }).run()
          }
          className={btnClass(editor.isActive("heading", { level }))}
        >
          H{level}
        </button>
      ))}

      {divider}

      {/* Text format */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={btnClass(editor.isActive("bold"))}
      >
        <strong>B</strong>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={btnClass(editor.isActive("italic"))}
      >
        <em>I</em>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={btnClass(editor.isActive("strike"))}
      >
        <s>S</s>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={btnClass(editor.isActive("code"))}
      >
        {"</>"}
      </button>

      {divider}

      {/* Lists */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={btnClass(editor.isActive("bulletList"))}
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={btnClass(editor.isActive("orderedList"))}
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      </button>

      {divider}

      {/* Block */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={btnClass(editor.isActive("blockquote"))}
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={btnClass(editor.isActive("codeBlock"))}
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={btnClass(false)}
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 12h14"
          />
        </svg>
      </button>

      {divider}

      {/* Link */}
      <button
        type="button"
        onClick={() => {
          if (editor.isActive("link")) {
            editor.chain().focus().unsetLink().run();
          } else {
            const url = window.prompt("URL:");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }
        }}
        className={btnClass(editor.isActive("link"))}
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      </button>

      {/* Image upload */}
      {onUploadImage && (
        <button
          type="button"
          onClick={onUploadImage}
          disabled={uploading}
          className={`${btnClass(false)} disabled:opacity-50`}
        >
          {uploading ? (
            <span className="text-xs">Uploading...</span>
          ) : (
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}

export function TiptapEditor({
  value,
  onChange,
  onUploadImage,
  uploading,
  onEditorReady,
}: TiptapEditorProps) {
  const onChangeRef = useRef(onChange);
  const isInternalUpdate = useRef(false);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: "plaintext",
      }),
      Image.configure({
        inline: false,
        allowBase64: false,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          class: "text-blue-600 underline dark:text-blue-400",
        },
      }),
      Placeholder.configure({
        placeholder: "Write your markdown here...",
      }),
      Table.configure({ resizable: false }),
      TableRow,
      TableCell,
      TableHeader,
      Markdown.configure({
        html: false,
        transformCopiedText: true,
        transformPastedText: true,
      }),
    ],
    immediatelyRender: false,
    content: value,
    onUpdate: ({ editor }) => {
      isInternalUpdate.current = true;
      onChangeRef.current(editor.storage.markdown.getMarkdown());
    },
    editorProps: {
      attributes: {
        class: "tiptap max-w-none outline-none min-h-[200px] px-4 py-3 text-sm",
      },
    },
  });

  useEffect(() => {
    if (editor && onEditorReady) {
      onEditorReady(editor);
    }
  }, [editor, onEditorReady]);

  useEffect(() => {
    if (!editor) return;
    if (isInternalUpdate.current) {
      isInternalUpdate.current = false;
      return;
    }
    if (value !== editor.storage.markdown.getMarkdown()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <EditorToolbar
        editor={editor}
        onUploadImage={onUploadImage}
        uploading={uploading}
      />
      <div className="flex-1 overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
