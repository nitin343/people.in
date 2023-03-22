/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

const ContentSecurityPolicy = `
default-src 'self';
script-src 'self';
child-src example.com;
style-src 'self' example.com;
font-src 'self';  
`

module.exports = {
  async headers() {
    return [
      {
        key: 'Content-Security-Policy',
        value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
      }
    ]
  },
}

