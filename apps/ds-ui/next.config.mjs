/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  transpilePackages: ["@sibyl/react"],   // compile le source TS/TSX brut des composants
};
export default nextConfig;
