'use client'

import { useState, useEffect } from 'react'
import { submitWaitlist } from '@/lib/waitlist'

export default function Waitlist() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  // Перевірка URL параметрів для статусу підтвердження
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const success = params.get('success')
    const error = params.get('error')

    if (success === 'confirmed') {
      setStatus('success')
      setMessage('✅ Email підтверджено! Ви додані до списку очікування.')
      // Очищаємо URL
      window.history.replaceState({}, '', window.location.pathname)
    } else if (error) {
      setStatus('error')
      const errorMessages: Record<string, string> = {
        invalid_token: 'Невірний токен підтвердження',
        expired_token: 'Токен застарів. Зареєструйтесь знову.',
        confirmation_failed: 'Помилка підтвердження. Спробуйте ще раз.',
        server_error: 'Помилка сервера. Спробуйте пізніше.',
      }
      setMessage(errorMessages[error] || 'Помилка підтвердження')
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [])

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
    <section id="waitlist" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Приєднуйтесь до списку очікування
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Будьте серед перших, хто спробує Flux OS. Отримайте доступ до бета-версії, як тільки вона буде готова.
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ваш email"
                required
                className="flex-1 px-6 py-4 bg-white border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900 transition-colors text-lg"
                disabled={status === 'loading'}
              />
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="px-8 py-4 bg-gray-900 text-white rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {status === 'loading' ? 'Відправка...' : status === 'success' ? 'Готово!' : 'Приєднатися'}
              </button>
            </div>
            
            {message && (
              <div className={`mt-4 p-4 rounded-lg ${
                status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
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

