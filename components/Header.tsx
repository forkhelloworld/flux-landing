'use client'

import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">Flux OS</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Можливості
            </a>
            <a href="#solution" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Рішення
            </a>
            <a href="#modules" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Модулі
            </a>
            <a href="#journey" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Сценарій
            </a>
            <a 
              href="#waitlist" 
              className="px-6 py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Спробувати
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-gray-900"
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 mt-2 pt-4">
            <nav className="flex flex-col gap-4">
              <a
                href="#features"
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Можливості
              </a>
              <a
                href="#solution"
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Рішення
              </a>
              <a
                href="#modules"
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Модулі
              </a>
              <a
                href="#journey"
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Сценарій
              </a>
              <a
                href="#waitlist"
                className="w-full px-6 py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Спробувати
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}


