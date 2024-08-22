/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["lucide-react"], // add this
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
