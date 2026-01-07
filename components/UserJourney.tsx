import { useTranslations } from 'next-intl'

export default function UserJourney() {
  const t = useTranslations('userJourney')
  
  const journey = [
    {
      day: t('monday.day'),
      phase: t('monday.phase'),
      title: t('monday.title'),
      description: t('monday.description'),
      icon: '📋',
    },
    {
      day: t('tuesday.day'),
      phase: t('tuesday.phase'),
      title: t('tuesday.title'),
      description: t('tuesday.description'),
      icon: '🔄',
    },
    {
      day: t('friday.day'),
      phase: t('friday.phase'),
      title: t('friday.title'),
      description: t('friday.description'),
      icon: '🎯',
    },
  ]

  return (
    <section id="journey" className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            {t('title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-6 sm:mb-8">
            {t('description')}
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {journey.map((step, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md p-6 sm:p-8 md:p-10 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-800 dark:bg-gray-700 rounded-full flex items-center justify-center text-3xl sm:text-4xl">
                    {step.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                    <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-semibold text-sm sm:text-base">
                      {step.day}
                    </span>
                    <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full font-semibold text-sm sm:text-base">
                      {step.phase}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                    {step.title}
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

