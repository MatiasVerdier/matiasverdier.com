import './env.mjs';

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/matiasvj/image/upload/**',
      },
    ],
    loader: 'custom',
    loaderFile: './lib/cloudinary-loader.ts',
  },
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html',
      },
    ];
  },
};

export default config;
