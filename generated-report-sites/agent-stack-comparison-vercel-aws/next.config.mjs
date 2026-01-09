/** @type {import('next').NextConfig} */
const nextConfig = {
  // Bundle optimization - tree-shake unused exports from these packages
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  
  // Empty turbopack config to acknowledge we're using Turbopack (Next.js 16 default)
  // maplibre-gl is already client-only via "use client" directive, no externals needed
  turbopack: {},
}

export default nextConfig
