import type { NextConfig } from 'next';

// Situs statis penuh: semua halaman dirender saat build lalu dilayani Caddy (lihat Dockerfile).
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: false,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
