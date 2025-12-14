import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {};

/**
 * Note that this component is required even for Markdown files.
 * @see https://nextjs.org/docs/app/guides/mdx#add-an-mdx-componentstsx-file
 */
export const useMDXComponents = (): MDXComponents => {
  return components;
};
