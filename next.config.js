/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    resolveAlias: {
      // `@eshaz/web-worker`'s Node entry does a dynamic import Turbopack can't
      // resolve; the radio MP3 decoder only needs the browser `Worker`.
      "@eshaz/web-worker": "./src/features/radio/lib/eshazWebWorkerShim.js",
    },
  },
};

module.exports = nextConfig;
