const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

  output: "export",
  basePath: "/nextjs-github-pages",
  images: {
    unoptimized: true,
  },
  reactStrictMode: false,
};

export default withMDX(nextConfig);
