module.exports = {
  async headers() {
    return [
      { 
        source: '/:path*{/}?',
        headers: [
          {
            key: 'x-custom-header',
            value: 'my custom header value for all pages',
          },
        ],
      },
    ]
  },
}
