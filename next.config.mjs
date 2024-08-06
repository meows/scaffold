/** 
 * @type {import('next').NextConfig} 
 * @date 27.06.2024
 * @note Next appears to be deprecating `experimental.serverComponentsExternalPackages`.
 * @see https://github.com/vercel/next.js/blob/canary/packages/next/src/lib/server-external-packages.json 
 */
const nextConfig = {
  // https://nextjs.org/docs/app/api-reference/next-config-js/eslint
  eslint: { ignoreDuringBuilds: true },
  experimental: {
    // https://nextjs.org/docs/app/api-reference/next-config-js/webVitalsAttribution
    // https://web.dev/articles/vitals
    webVitalsAttribution: ["CLS", "LCP", "INP"],
  },
  // https://nextjs.org/docs/api-reference/next.config.js/dev-indicators
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: "top-left",
  },
}

export default nextConfig