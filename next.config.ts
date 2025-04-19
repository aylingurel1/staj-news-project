import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'dims.apnews.com',
      'assets.apnews.com',
      'image.cnbcfm.com',
      'ichef.bbci.co.uk',
      'media.cnn.com',
      'www.reuters.com',
      'i.cnn.net',
      'static.foxnews.com',
      'cdn.vox-cdn.com',
      'storage.googleapis.com',
      'nypost.com',
      's.yimg.com',
      'img.huffingtonpost.com',
      'cbsnews.com',
      'media.npr.org',
      'static01.nyt.com',
      'img.washingtonpost.com',
      'media.wired.com'
    ],
    // Alternative approach using remotePatterns if you have a lot of different domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
