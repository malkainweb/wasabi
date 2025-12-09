/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // Optional: if you also have TypeScript errors
  },
  // ... rest of your config
};

export default nextConfig;
