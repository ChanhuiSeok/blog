import type { MDXComponents } from "mdx/types";
import { Callout } from "./Callout";

export const mdxComponents: MDXComponents = {
  Callout,
  // rehype-pretty-code handles code blocks via data attributes
  // so we style them in CSS rather than with a custom component
};
