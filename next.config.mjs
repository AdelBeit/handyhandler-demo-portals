/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: [
    "http://localhost:3000",
    "https://*.tinyfi.sh",
    "http://*.tinyfi.sh"
  ]
};

export default nextConfig;
