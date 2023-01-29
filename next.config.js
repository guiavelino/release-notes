const appVersion = () => {
  return '1';
};

module.exports = {
  env: {
    APP_ENV: 'development',
    API: 'https://api.releasenotes.app/',
    APP_VERSION_CODE: appVersion(),
    NEXT_PUBLIC_GA_ID: '',
  },
  images: {
    domains: [
      'assets.releasenotes.app',
      'images.pexels.com'
    ]
  },
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    staticFolder: '/public',
    assets: 'https://assets.releasenotes.app/'
  },
  swcMinify: true,
  api: {
    externalResolver: true
  },
  poweredByHeader: false,
  reactStrictMode: false,
  i18n: {
    locales: ['pt-BR'],
    defaultLocale: 'pt-BR',
    localeDetection: false
  },
};