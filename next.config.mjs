import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const securityHeaders = [
  // Prevent browsers from MIME-sniffing a response away from the declared content-type
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Block the site from being embedded in iframes (clickjacking protection)
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Stop passing the full referrer URL to third parties
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Restrict browser feature access; extend as your app requires
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  // Legacy XSS filter (belt-and-suspenders for older browsers)
  { key: 'X-XSS-Protection', value: '1; mode=block' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Suppress the "X-Powered-By: Next.js" response header
  poweredByHeader: false,

  typescript: {
    ignoreBuildErrors: true,
  },

  // Re-enable Next.js image optimisation.
  // All external hostnames used by next/image must be listed here.
  images: {
    remotePatterns: [
      // Unsplash — blog section images across all product pages
      { protocol: 'https', hostname: 'images.unsplash.com' },
      // YouTube — video thumbnail images (img.youtube.com)
      { protocol: 'https', hostname: 'img.youtube.com' },
      // Vercel Blob Storage — product mockup screenshots and unit images
      { protocol: 'https', hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com' },
      // WorldVectorLogo CDN — integration logos on the home/integrations section
      { protocol: 'https', hostname: 'cdn.worldvectorlogo.com' },
      // Zegocloud — integration logo
      { protocol: 'https', hostname: 'www.zegocloud.com' },
      // PropertyCareApp API — dynamic blog post cover images fetched from the backend
      { protocol: 'https', hostname: 'api.propertycareapp.com' },
    ],
  },

  async headers() {
    return [
      {
        // Apply security headers to every route
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
