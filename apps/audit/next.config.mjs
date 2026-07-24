/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",            // site statique -> GitHub Pages (comme aujourd'hui)
  images: { unoptimized: true },
  trailingSlash: true,
};
export default nextConfig;
