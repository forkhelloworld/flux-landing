'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { submitWaitlist } from '@/lib/waitlist'

function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const t = useTranslations('hero.waitlist')

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
    <div className="space-y-2 sm:space-y-3 w-full">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('emailPlaceholder')}
          required
          className="w-full sm:flex-1 px-3 py-2.5 sm:px-4 sm:py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-gray-900 dark:focus:border-gray-400 focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-400 transition-colors text-sm sm:text-base"
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="w-full sm:w-auto px-4 py-2.5 sm:px-5 sm:py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
        >
          {status === 'loading' ? t('loading') : status === 'success' ? t('success') : t('joinButton')}
        </button>
      </form>
      {message && (
        <p className={`text-xs sm:text-sm ${
          status === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
        }`}>
          {message}
        </p>
      )}
    </div>
  )
}

export default function Hero() {
  const t = useTranslations('hero')
  const tAgent = useTranslations('hero.agent')
  
  const [aiStatus, setAiStatus] = useState<'planning' | 'analyzing' | 'recalculating' | 'optimizing'>('planning')
  const [tasks, setTasks] = useState([
    { id: 1, text: t('tasks.competitorAnalysis.text'), subtext: t('tasks.competitorAnalysis.subtext'), tag: 'blue', priority: 'red', status: 'active' as const },
    { id: 2, text: t('tasks.figmaPrototype.text'), subtext: t('tasks.figmaPrototype.subtext'), tag: 'beige', priority: 'green', status: 'active' as const },
    { id: 3, text: t('tasks.dbSetup.text'), subtext: t('tasks.dbSetup.subtext'), tag: 'blue', priority: 'yellow', status: 'active' as const },
    { id: 4, text: t('tasks.hypothesisTesting.text'), subtext: t('tasks.hypothesisTesting.subtext'), tag: 'beige', priority: 'red', status: 'active' as const },
    { id: 5, text: t('tasks.telegramBot.text'), subtext: t('tasks.telegramBot.subtext'), tag: 'blue', priority: 'green', status: 'active' as const },
    { id: 6, text: t('tasks.apiDocs.text'), subtext: t('tasks.apiDocs.subtext'), tag: 'beige', priority: 'yellow', status: 'active' as const },
  ])
  const [isThinking, setIsThinking] = useState(true)

  // Simulate AI agentic planning behavior
  useEffect(() => {
    const statuses: Array<'planning' | 'analyzing' | 'recalculating' | 'optimizing'> = ['planning', 'analyzing', 'recalculating', 'optimizing']
    let statusIndex = 0

    const statusInterval = setInterval(() => {
      setAiStatus(statuses[statusIndex])
      statusIndex = (statusIndex + 1) % statuses.length
    }, 3000)

    // Simulate task reordering and status changes
    const taskInterval = setInterval(() => {
      setIsThinking(true)
      setTimeout(() => {
        setTasks(prev => {
          const newTasks = [...prev]
          // Simulate AI reordering tasks based on priority/energy
          if (Math.random() > 0.5) {
            const randomIndex = Math.floor(Math.random() * newTasks.length)
            const task = newTasks[randomIndex]
            if (task) {
              // Simulate AI changing priority or status
              task.priority = task.priority === 'red' ? 'yellow' : task.priority === 'yellow' ? 'green' : 'red'
            }
          }
          return newTasks
        })
        setIsThinking(false)
      }, 800)
    }, 4000)

    return () => {
      clearInterval(statusInterval)
      clearInterval(taskInterval)
    }
  }, [])

  return (
    <section className="relative min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Colorful top strip */}
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-pink-400"></div>
        <div className="flex-1 bg-orange-400"></div>
        <div className="flex-1 bg-sky-400"></div>
        <div className="flex-1 bg-purple-400"></div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-12 py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start lg:items-center min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh]">
          {/* Left Section - Text Content */}
          <div className="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 w-full">
            {/* Green square icon */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-green-500 rounded-lg flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 dark:text-white mb-2 sm:mb-3 md:mb-4 leading-tight">
                {t('title')}
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('subtitle')}
              </p>
            </div>

            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('description')}
            </p>

            {/* Waitlist Form */}
            <WaitlistForm />
          </div>

          {/* Right Section - Agentic Planning Interface */}
          <div className="relative w-full mt-6 sm:mt-0 overflow-hidden">
            <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-2xl p-3 sm:p-4 md:p-6 space-y-2 sm:space-y-3 overflow-x-hidden">
              {/* AI Agent Status Header */}
              <div className="flex justify-between items-center mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="relative">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg ${isThinking ? 'animate-pulse' : ''}`}>
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    {isThinking && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full animate-ping"></div>
                    )}
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">{tAgent('title')}</div>
                    <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <span className={`inline-block w-2 h-2 rounded-full ${
                        aiStatus === 'planning' ? 'bg-blue-500 animate-pulse' :
                        aiStatus === 'analyzing' ? 'bg-purple-500 animate-pulse' :
                        aiStatus === 'recalculating' ? 'bg-orange-500 animate-pulse' :
                        'bg-green-500 animate-pulse'
                      }`}></span>
                      <span>
                        {tAgent(`status.${aiStatus}`)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 sm:gap-2">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black rounded flex items-center justify-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    </div>
                    <span className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 mt-1">TOP</span>
                  </div>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Task List - Dynamically managed by AI */}
              <div className="space-y-2 sm:space-y-3 max-h-[300px] sm:max-h-[400px] md:max-h-none overflow-y-auto overflow-x-hidden">
                {tasks.map((task, index) => (
                  <div 
                    key={task.id} 
                    className={`relative group transition-all duration-300 overflow-hidden ${
                      isThinking && index === 0 ? 'opacity-60' : ''
                    }`}
                  >
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2.5 sm:p-3 md:p-4 flex items-start gap-2 sm:gap-3 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200">
                      {/* Checkbox with AI decision indicator */}
                      <div className="relative">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-gray-300 rounded mt-1 flex-shrink-0"></div>
                      </div>
                      
                      {/* Task content */}
                      <div className="flex-1 min-w-0 overflow-hidden">
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                          <div className="h-3 sm:h-4 bg-gray-400 rounded flex-1 min-w-0"></div>
                          {index === 0 && isThinking && (
                            <div className="flex gap-0.5 sm:gap-1 flex-shrink-0">
                              <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                              <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                              <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                          )}
                        </div>
                        <div className="h-2.5 sm:h-3 bg-gray-300 rounded w-1/2"></div>
                      </div>

                      {/* Tag and priority - AI managed */}
                      <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                        <div className={`w-10 h-4 sm:w-12 sm:h-5 rounded transition-colors duration-300 ${
                          task.tag === 'blue' ? 'bg-blue-200' : 'bg-amber-200'
                        }`}></div>
                        <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-colors duration-300 ${
                          task.priority === 'red' ? 'bg-red-500' : 
                          task.priority === 'green' ? 'bg-green-500' : 'bg-yellow-500'
                        } ${isThinking && index === 0 ? 'animate-pulse' : ''}`}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Agent Actions Footer */}
              <div className="flex justify-between items-center mt-2 sm:mt-3 md:mt-4 pt-2 sm:pt-3 md:pt-4 border-t border-gray-200 dark:border-gray-700 gap-1 sm:gap-2">
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-green-500 rounded rotate-12 flex items-center justify-center shadow-md">
                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-600 dark:text-gray-400 hidden md:inline">{tAgent('actions.autoComplete')}</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-red-500 rounded flex items-center justify-center shadow-md">
                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                  <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-600 dark:text-gray-400 hidden md:inline">{tAgent('actions.remove')}</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-md ${isThinking ? 'animate-spin' : ''}`}>
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-600 dark:text-gray-400 hidden md:inline">{tAgent('actions.recalculate')}</span>
                </div>
              </div>
              
              {/* AI Agent Status Message */}
              <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 text-[9px] sm:text-[10px] md:text-xs text-gray-500 dark:text-gray-400">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-pulse flex-shrink-0"></div>
                  <span className="truncate">
                    {tAgent(`messages.${aiStatus}`)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
