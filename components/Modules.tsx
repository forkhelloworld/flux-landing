import { useTranslations } from 'next-intl'

export default function Modules() {
  const t = useTranslations('modules')
  
  const modules = [
    {
      title: t('blueprint.title'),
      subtitle: t('blueprint.subtitle'),
      problem: t('blueprint.problem'),
      features: [
        t('blueprint.features.inputToPlan'),
        t('blueprint.features.contextInterview'),
        t('blueprint.features.treeGeneration'),
        t('blueprint.features.autoTagging'),
      ],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: t('flowEngine.title'),
      subtitle: t('flowEngine.subtitle'),
      problem: t('flowEngine.problem'),
      features: [
        t('flowEngine.features.morningCheckin'),
        t('flowEngine.features.dynamicFiltering'),
        t('flowEngine.features.liquidTime'),
        t('flowEngine.features.gpsRescheduling'),
      ],
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: t('relevanceEngine.title'),
      subtitle: t('relevanceEngine.subtitle'),
      problem: t('relevanceEngine.problem'),
      features: [
        t('relevanceEngine.features.hypothesisTesting'),
        t('relevanceEngine.features.impactFeedback'),
        t('relevanceEngine.features.rottingTasks'),
      ],
      color: 'from-orange-500 to-red-500',
    },
    {
      title: t('interface.title'),
      subtitle: t('interface.subtitle'),
      problem: t('interface.problem'),
      features: [
        t('interface.features.focusMode'),
        t('interface.features.swipeControl'),
        t('interface.features.panicButton'),
      ],
      color: 'from-green-500 to-emerald-500',
    },
  ]

  return (
    <section id="modules" className="py-12 sm:py-16 lg:py-20 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            {t('title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="space-y-8 sm:space-y-10 lg:space-y-12">
          {modules.map((module, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sm:p-8 md:p-12 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
                <div className="md:w-1/3">
                  <div className={`inline-block bg-gray-800 dark:bg-gray-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-bold text-base sm:text-lg mb-3 sm:mb-4`}>
                    {t('module')} {index + 1}
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {module.title}
                  </h3>
                  <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 font-semibold mb-3 sm:mb-4">
                    {module.subtitle}
                  </p>
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 italic">
                    {t('solvesProblem')} "{module.problem}"
                  </p>
                </div>
                <div className="md:w-2/3">
                  <ul className="space-y-3 sm:space-y-4">
                    {module.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <span className="text-green-500 dark:text-green-400 mr-2 sm:mr-3 text-lg sm:text-xl font-bold">✓</span>
                        <span className="text-base sm:text-lg text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

