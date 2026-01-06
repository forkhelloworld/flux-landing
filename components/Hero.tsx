'use client'

import { useState } from 'react'
import { submitWaitlist } from '@/lib/waitlist'

function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

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
    <div className="space-y-3">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ваш email"
          required
          className="flex-1 px-5 py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900 transition-colors"
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {status === 'loading' ? '...' : status === 'success' ? '✓' : 'Приєднатися'}
        </button>
      </form>
      {message && (
        <p className={`text-sm ${
          status === 'success' ? 'text-green-600' : 'text-red-600'
        }`}>
          {message}
        </p>
      )}
    </div>
  )
}

export default function Hero() {
  const tasks = [
    { text: 'Аналіз конкурентів', subtext: 'Дослідити 5 основних конкурентів', tag: 'blue', priority: 'red' },
    { text: 'Прототип у Figma', subtext: 'Створити wireframes для MVP', tag: 'beige', priority: 'green' },
    { text: 'Налаштування БД', subtext: 'Підключити Neo4j до проекту', tag: 'blue', priority: 'yellow' },
    { text: 'Тестування гіпотез', subtext: 'Перевірити актуальність задач', tag: 'beige', priority: 'red' },
    { text: 'Розробка Telegram-бота', subtext: 'Замість мобільного додатку', tag: 'blue', priority: 'green' },
    { text: 'Документація API', subtext: 'Опис ендпоінтів для команди', tag: 'beige', priority: 'yellow' },
  ]

  return (
    <section className="relative min-h-screen bg-gray-100">
      {/* Colorful top strip */}
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-pink-400"></div>
        <div className="flex-1 bg-orange-400"></div>
        <div className="flex-1 bg-sky-400"></div>
        <div className="flex-1 bg-purple-400"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Section - Text Content */}
          <div className="space-y-8">
            {/* Green square icon */}
            <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4 leading-tight">
                Flux OS
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                Перший планер, який розуміє, що життя йде не за планом.
              </p>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed">
              План — це не контракт, а маршрут, що постійно перераховується. AI-асистент для стратегічного планування та адаптивного виконання.
            </p>

            {/* Waitlist Form */}
            <WaitlistForm />
          </div>

          {/* Right Section - To-Do List Interface */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-6 space-y-3">
              {/* Interactive elements above list */}
              <div className="flex justify-between items-start mb-4">
                <div className="w-8 h-8 bg-green-500 rounded rotate-12 flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-lg">*</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-600 mt-1">TOP</span>
                  </div>
                  <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Task List */}
              {tasks.map((task, index) => (
                <div key={index} className="relative group">
                  <div className="bg-gray-100 rounded-lg p-4 flex items-start gap-3 hover:bg-gray-200 transition-colors">
                    {/* Checkbox */}
                    <div className="w-5 h-5 border-2 border-gray-300 rounded mt-1 flex-shrink-0"></div>
                    
                    {/* Task content */}
                    <div className="flex-1 min-w-0">
                      <div className="h-4 bg-gray-400 rounded mb-2 w-3/4"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    </div>

                    {/* Tag and priority */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className={`w-12 h-5 rounded ${
                        task.tag === 'blue' ? 'bg-blue-200' : 'bg-amber-200'
                      }`}></div>
                      <div className={`w-3 h-3 rounded-full ${
                        task.priority === 'red' ? 'bg-red-500' : 
                        task.priority === 'green' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                    </div>
                  </div>

                  {/* Floating icons for some tasks */}
                  {index === 2 && (
                    <div className="absolute -right-12 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-2">
                      <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                      </div>
                    </div>
                  )}
                  
                  {index === 2 && (
                    <div className="absolute -right-24 top-0 flex flex-col gap-1">
                      <div className="text-red-600 font-bold text-2xl">!!</div>
                    </div>
                  )}
                </div>
              ))}

              {/* Interactive elements below list */}
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                <div className="w-6 h-6 bg-green-500 rounded rotate-12 flex items-center justify-center shadow-md">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center shadow-md">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
