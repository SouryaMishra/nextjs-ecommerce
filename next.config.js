/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "images.unsplash.com" }, { hostname: "lh3.googleusercontent.com" }],
  },
};

module.exports = nextConfig;
