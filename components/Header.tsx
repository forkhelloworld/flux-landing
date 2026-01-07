'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { locales, type Locale } from '@/i18n'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const t = useTranslations('header.nav')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (newLocale: Locale) => {
    // Get current path without locale prefix
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
    // Build new path with new locale
    const newPath = `/${newLocale}${pathWithoutLocale}`
    // Use window.location for full page reload to ensure translations are updated
    window.location.href = newPath
  }

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Flux OS</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-8">
            <a href="#features" className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">
              {t('features')}
            </a>
            <a href="#solution" className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">
              {t('solution')}
            </a>
            <a href="#modules" className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">
              {t('modules')}
            </a>
            <a href="#journey" className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">
              {t('journey')}
            </a>
            <a 
              href="#waitlist" 
              className="px-4 py-1.5 lg:px-6 lg:py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors text-sm lg:text-base"
            >
              {t('try')}
            </a>
            {/* Theme Toggle */}
            <ThemeToggle />
            {/* Language Switcher */}
            <div className="flex items-center gap-1.5 lg:gap-2 ml-2 lg:ml-4">
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => switchLocale(loc)}
                  className={`px-2 py-1 lg:px-3 lg:py-1 rounded text-xs lg:text-sm font-medium transition-colors ${
                    locale === loc
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {loc.toUpperCase()}
                </button>
              ))}
            </div>
          </nav>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 dark:border-gray-800 mt-2 pt-4">
            <nav className="flex flex-col gap-3">
              <a
                href="#features"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('features')}
              </a>
              <a
                href="#solution"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('solution')}
              </a>
              <a
                href="#modules"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('modules')}
              </a>
              <a
                href="#journey"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('journey')}
              </a>
              <a
                href="#waitlist"
                className="w-full px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors text-center text-sm sm:text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('try')}
              </a>
              {/* Mobile Language Switcher */}
              <div className="flex items-center gap-2 pt-3 border-t border-gray-200 dark:border-gray-800">
                {locales.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      switchLocale(loc)
                      setIsMenuOpen(false)
                    }}
                    className={`px-2.5 py-1 rounded text-xs sm:text-sm font-medium transition-colors ${
                      locale === loc
                        ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                        : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {loc.toUpperCase()}
                  </button>
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}


