module.exports = {
  images: {
    domains: [
      'images.prismic.io',
      'dev-to-uploads.s3.amazonaws.com',
      'assets.tina.io',
    ],
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
