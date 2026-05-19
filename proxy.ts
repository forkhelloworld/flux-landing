import { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n';

// Handler for regular users (with dynamic language detection based on headers/cookies)
const handleI18nRouting = createMiddleware({
  locales,
  defaultLocale: 'en',
  localeDetection: true,
});

// Handler for search engine bots (statically redirects / to /ua to prevent indexing issues)
const handleBotRouting = createMiddleware({
  locales,
  defaultLocale: 'en',
  localeDetection: false,
});

export default function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const isBot = /bot|crawler|spider|google|bing|yahoo/i.test(userAgent);

  if (isBot) {
    return handleBotRouting(request);
  }

  return handleI18nRouting(request);
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
