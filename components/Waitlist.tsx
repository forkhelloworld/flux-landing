'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { submitWaitlist } from '@/lib/waitlist'

export default function Waitlist() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const t = useTranslations('waitlist')
  const tMessages = useTranslations('waitlist.messages')

  // Перевірка URL параметрів для статусу підтвердження
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const success = params.get('success')
    const error = params.get('error')

    if (success === 'confirmed') {
      setStatus('success')
      setMessage(tMessages('emailConfirmed'))
      // Очищаємо URL
      window.history.replaceState({}, '', window.location.pathname)
    } else if (error) {
      setStatus('error')
      const errorMessages: Record<string, string> = {
        invalid_token: tMessages('invalidToken'),
        expired_token: tMessages('expiredToken'),
        confirmation_failed: tMessages('confirmationFailed'),
        server_error: tMessages('serverError'),
      }
      setMessage(errorMessages[error] || tMessages('confirmationError'))
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [tMessages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    const result = await submitWaitlist(email)

    if (result.success) {
      setStatus('success')
      setMessage(result.message)
      setEmail('')
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 3000)
    } else {
      setStatus('error')
      setMessage(result.message)
    }
  }

  return (
    <section id="waitlist" className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            {t('title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 sm:p-8 md:p-12 shadow-lg border border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('emailPlaceholder')}
                required
                className="flex-1 px-4 py-3 sm:px-6 sm:py-4 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-gray-900 dark:focus:border-gray-400 focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-400 transition-colors text-base sm:text-lg"
                disabled={status === 'loading'}
              />
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="px-6 py-3 sm:px-8 sm:py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {status === 'loading' ? t('loading') : status === 'success' ? t('success') : t('joinButton')}
              </button>
            </div>
            
            {message && (
              <div className={`mt-3 sm:mt-4 p-3 sm:p-4 rounded-lg text-sm sm:text-base ${
                status === 'success' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
              }`}>
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

