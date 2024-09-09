/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["lucide-react"], // add this
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "post-image.s3.us-west-002.backblazeb2.com",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
    ],
  },
}

export default nextConfig
