import { useTranslations } from 'next-intl'

export default function Problem() {
  const t = useTranslations('problem')
  
  const problems = [
    {
      title: t('staticity.title'),
      description: t('staticity.description'),
      icon: '📊',
    },
    {
      title: t('sunkCost.title'),
      description: t('sunkCost.description'),
      icon: '💸',
    },
    {
      title: t('startParalysis.title'),
      description: t('startParalysis.description'),
      icon: '🚫',
    },
  ]

  return (
    <section id="features" className="py-12 sm:py-16 lg:py-20 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            {t('title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{problem.icon}</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                {problem.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

