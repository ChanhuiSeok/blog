import type { MDXComponents } from "mdx/types";
import { Callout } from "./Callout";
import { MdxImage } from "./MdxImage";

export const mdxComponents: MDXComponents = {
  Callout,
  img: MdxImage,
};
