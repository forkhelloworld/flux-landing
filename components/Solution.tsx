import { useTranslations } from 'next-intl'

export default function Solution() {
  const t = useTranslations('solution')

  return (
    <section id="solution" className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            {t('title')}
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed">
              {t.rich('description', {
                strong: (chunks) => <span className="font-semibold text-primary-700 dark:text-primary-400">{chunks}</span>
              })}
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium">
              {t('subDescription')}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 md:p-12 max-w-5xl mx-auto border border-gray-200 dark:border-gray-700">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                {t('generativeAI.title')}
              </h3>
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-4 sm:mb-6">
                {t('generativeAI.description')}
              </p>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                {t('adaptivePlanning.title')}
              </h3>
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-4 sm:mb-6">
                {t('adaptivePlanning.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

