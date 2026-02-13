import { compileMDX } from "next-mdx-remote/rsc";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import { mdxComponents } from "@/components/mdx";
import type { Options } from "rehype-pretty-code";

const prettyCodeOptions: Options = {
  theme: {
    dark: "github-dark",
    light: "github-light",
  },
  keepBackground: false,
};

export async function renderMDX(source: string) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCodeOptions]],
      },
    },
  });

  return content;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

/** Render markdown to HTML string (for preview). Same plugins as renderMDX. */
export async function renderMarkdownToHtml(source: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypePrettyCode, prettyCodeOptions)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(source);

  return String(result);
}

export function extractToc(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].replace(/[`*_~]/g, "").trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    toc.push({ id, text, level });
  }

  return toc;
}
