import createNextIntlPlugin from 'next-intl/plugin';
import withBundleAnalyzerInit from '@next/bundle-analyzer';

const withNextIntl = createNextIntlPlugin('./i18n.ts');
const withBundleAnalyzer = withBundleAnalyzerInit({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.0.39'],
  reactStrictMode: true,
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
