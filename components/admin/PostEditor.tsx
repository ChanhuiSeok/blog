"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { MarkdownEditor } from "./MarkdownEditor";
import { MarkdownPreview } from "./MarkdownPreview";
import { CATEGORIES, type Category } from "@/types";
import { slugify } from "@/lib/utils";

interface PostData {
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: Category;
  tags: string[];
  coverImage: string;
  published: boolean;
}

interface PostEditorProps {
  initialData?: PostData;
}

export function PostEditor({ initialData }: PostEditorProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [slugManual, setSlugManual] = useState(!!initialData?.slug);

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [content, setContent] = useState(initialData?.content ?? "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt ?? "");
  const [category, setCategory] = useState<Category>(
    initialData?.category ?? "tech",
  );
  const [tags, setTags] = useState(initialData?.tags?.join(", ") ?? "");
  const [coverImage, setCoverImage] = useState(
    initialData?.coverImage ?? "",
  );

  const [mobileTab, setMobileTab] = useState<"editor" | "preview">("editor");

  const isEdit = !!initialData?.id;
  const isDirty = useRef(false);

  // Track dirty state
  useEffect(() => {
    isDirty.current = true;
  }, [title, slug, content, excerpt, category, tags, coverImage]);

  // beforeunload warning
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isDirty.current) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugManual && title) {
      setSlug(slugify(title));
    }
  }, [title, slugManual]);

  const handleSlugChange = (value: string) => {
    setSlugManual(true);
    setSlug(value);
  };

  const handleUploadImage = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);
    setError("");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (json.success && json.data?.url) {
        const imageMarkdown = `![${file.name}](${json.data.url})`;
        setContent((prev) => prev + `\n${imageMarkdown}\n`);
      } else {
        setError(json.error || "Upload failed");
      }
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
    }

    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSave = async (publish: boolean) => {
    setError("");
    setSaving(true);

    const parsedTags = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const body = {
      title,
      slug,
      content,
      excerpt: excerpt || undefined,
      category,
      tags: parsedTags,
      coverImage: coverImage || undefined,
      published: publish,
    };

    try {
      const url = isEdit ? `/api/posts/${initialData.id}` : "/api/posts";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const json = await res.json();

      if (!json.success) {
        setError(json.error || "Failed to save");
        return;
      }

      isDirty.current = false;
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3 md:px-6">
        <h1 className="text-lg font-bold">
          {isEdit ? "Edit Post" : "New Post"}
        </h1>
        <div className="flex items-center gap-2">
          {error && (
            <span className="text-sm text-destructive">{error}</span>
          )}
          <button
            type="button"
            onClick={() => handleSave(false)}
            disabled={saving || !title || !slug || !content}
            className="rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Draft"}
          </button>
          <button
            type="button"
            onClick={() => handleSave(true)}
            disabled={saving || !title || !slug || !content}
            className="rounded-md bg-foreground px-3 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>

      {/* Metadata Form */}
      <div className="grid grid-cols-2 gap-4 border-b border-border px-4 py-4 md:px-6 lg:grid-cols-4">
        <div className="col-span-2 lg:col-span-1">
          <label className="mb-1 block text-xs font-medium text-muted-foreground">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
            className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm outline-none focus:border-accent"
          />
        </div>
        <div className="col-span-2 lg:col-span-1">
          <label className="mb-1 block text-xs font-medium text-muted-foreground">
            Slug
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => handleSlugChange(e.target.value)}
            placeholder="post-slug"
            className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm outline-none focus:border-accent"
          >
            {Object.entries(CATEGORIES).map(([key, val]) => (
              <option key={key} value={key}>
                {val.icon} {val.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">
            Tags
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="tag1, tag2, tag3"
            className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm outline-none focus:border-accent"
          />
        </div>
        <div className="col-span-2">
          <label className="mb-1 block text-xs font-medium text-muted-foreground">
            Excerpt
          </label>
          <input
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Short description (optional)"
            className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm outline-none focus:border-accent"
          />
        </div>
        <div className="col-span-2">
          <label className="mb-1 block text-xs font-medium text-muted-foreground">
            Cover Image URL
          </label>
          <input
            type="text"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="/images/cover.png (optional)"
            className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm outline-none focus:border-accent"
          />
        </div>
      </div>

      {/* Mobile Tab Switcher */}
      <div className="flex border-b border-border lg:hidden">
        <button
          type="button"
          onClick={() => setMobileTab("editor")}
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            mobileTab === "editor"
              ? "border-b-2 border-foreground text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Editor
        </button>
        <button
          type="button"
          onClick={() => setMobileTab("preview")}
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            mobileTab === "preview"
              ? "border-b-2 border-foreground text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Preview
        </button>
      </div>

      {/* Split View: Editor + Preview */}
      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-2">
        {/* Editor */}
        <div className={`min-h-0 border-r border-border ${mobileTab === "preview" ? "hidden lg:block" : ""}`}>
          <MarkdownEditor
            value={content}
            onChange={setContent}
            onUploadImage={handleUploadImage}
            uploading={uploading}
          />
        </div>
        {/* Preview */}
        <div className={`min-h-0 overflow-auto bg-background ${mobileTab === "editor" ? "hidden lg:block" : ""}`}>
          <MarkdownPreview content={content} />
        </div>
      </div>

      {/* Hidden file input for image upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
