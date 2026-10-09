import type { NextConfig } from 'next';

/**
 * The repository is deployed twice from one build: mehfooj.dev and
 * resume.mehfooj.dev. The routing difference between the two hosts is handled in
 * `src/middleware.ts`, so there is nothing host specific to configure here and
 * no environment flag that has to be set in the right dashboard and remembered.
 */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imagekit.io',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dribbble.com',
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
      },
      {
        protocol: 'https',
        hostname: 'images-na.ssl-images-amazon.com',
      },
    ],
  },
};

export default nextConfig;
