/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    i18n: {
      locales: ['en-US', 'zh-CN'],
      defaultLocale: 'en-US',
    },
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          encoding: require.resolve('encoding'),
        };
      }
      // Ignore pino-pretty in client-side bundle (it's an optional dev dependency)
      config.resolve.alias = {
        ...config.resolve.alias,
        'pino-pretty': false,
      };
      return config;
    },
  };
  
  module.exports = nextConfig;