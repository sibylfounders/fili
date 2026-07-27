/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  transpilePackages: ["@sibyl/react", "@sibyl/charts", "@sibyl/tokens"],
};
export default nextConfig;
