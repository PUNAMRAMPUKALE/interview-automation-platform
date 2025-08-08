/** @type {import('next').NextConfig} */
const nextConfig = {
// next.config.js
  images: {
    remotePatterns: [
        {
        protocol: "https",
        hostname:"randomuser.me",
        },
    ],
  }
};

export default nextConfig;
