module.exports = {
  images: {
    domains: ['images.prismic.io', 'dev-to-uploads.s3.amazonaws.com'],
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
