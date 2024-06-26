/** @type {import('next').NextConfig} */
const nextConfig = {
  // https://nextjs.org/docs/app/api-reference/next-config-js/eslint
  eslint: { ignoreDuringBuilds: true },
  // https://nextjs.org/docs/app/api-reference/next-config-js/webVitalsAttribution
  webVitalsAttribution: ["CLS", "LCP"],
}

export default nextConfig
