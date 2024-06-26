/** @type {import('next').NextConfig} */
const nextConfig = {
  // https://nextjs.org/docs/app/api-reference/next-config-js/eslint
  eslint: { ignoreDuringBuilds: true },
  experimental: {
    // https://nextjs.org/docs/app/api-reference/next-config-js/webVitalsAttribution
    // https://web.dev/articles/vitals
    webVitalsAttribution: ["CLS", "LCP", "INP"],
  }
}

export default nextConfig
