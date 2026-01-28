/** @type {import('next').NextConfig} */
const nextConfig = {
  // Eliminamos el bloque 'eslint' porque ya no es válido aquí
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
}

module.exports = nextConfig