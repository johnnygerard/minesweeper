import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  reactStrictMode: true,
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        // Do not prevent search engines from indexing the website
        // @see https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag#directives
        {
          key: "x-robots-tag",
          value: "all",
        },
      ],
    },
  ],
};

const withMDX = createMDX({
  // Add Markdown plugins here, as desired
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
