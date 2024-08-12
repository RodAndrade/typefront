const { createSecureHeaders } = require('next-secure-headers');
const nextBuildId = require('next-build-id');

const package = require('./package.json');

/** @type {import('next').NextConfig} */
module.exports = {
  async headers() {
    const buildDate = new Date().toGMTString();

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, must-revalidate',
          },
          ...createSecureHeaders({
            frameGuard: 'sameorigin',
            forceHTTPSRedirect: [
              true,
              {
                maxAge: 60 * 60 * 24 * 4,
                includeSubDomains: true,
                preload: true,
              },
            ],
            referrerPolicy: 'strict-origin-when-cross-origin',
            nosniff: 'nosniff',
            xssProtection: 'block-rendering',
            contentSecurityPolicy: {
              directives: {
                defaultSrc: ["'self'", '*.forsign.digital'],
                scriptSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
                styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com'],
                connectSrc: ["'self'"],
                frameSrc: ["'self'"],
                imgSrc: ["'self'", 'data:'],
                fontSrc: ["'self'", 'fonts.gstatic.com'],
              },
            },
          }),
          {
            key: 'Last-Modified',
            value: `${buildDate}`,
          },
        ],
      },
    ];
  },
  async redirects() {
    const redirects = [
      {
        source: '/',
        destination: '/app',
        permanent: true,
      },
    ];

    return redirects;
  },
  generateBuildId: () =>
    nextBuildId?.({
      dir: __dirname,
      describe: true,
    }).catch(() => package.version),
};
