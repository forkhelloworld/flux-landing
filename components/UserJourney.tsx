export default function UserJourney() {
  const journey = [
    {
      day: 'Понеділок',
      phase: 'Стратегія',
      title: 'Створення плану',
      description: 'Алекс пише в Flux: "Хочу запустити MVP додатку для обліку фінансів". Flux генерує план: "Аналіз конкурентів", "Прототип у Figma", "Налаштування БД". Алекс погоджує план.',
      icon: '📋',
    },
    {
      day: 'Вівторок',
      phase: 'Реальність',
      title: 'Адаптація до обставин',
      description: 'Алекс затримався на основній роботі. Енергія на нулі. Система бачить, що вечір зайнятий, і автоматично прибирає задачу "Прототип у Figma" (бо вона вимагає креативу). Замість цього пропонує: "Подивитися 2 відео про конкурентів" (Low Energy).',
      icon: '🔄',
    },
    {
      day: 'П\'ятниця',
      phase: 'Аналіз',
      title: 'Переоцінка стратегії',
      description: 'Алекс розуміє, що ніхто не користується додатками, всі сидять у Telegram-ботах. Він позначає гіпотезу "Мобільний додаток" як неактуальну. Flux питає: "Видалити задачі по React Native і замінити їх на план розробки Telegram-бота?". Алекс тисне "Так". Календар очищується від сміття.',
      icon: '🎯',
    },
  ]

  return (
    <section id="journey" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Сценарій використання
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Персона: Алекс, розробник, хоче запустити стартап, але працює на фул-тайм роботі.
          </p>
        </div>

        <div className="space-y-8">
          {journey.map((step, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl shadow-md p-8 md:p-10 hover:shadow-lg transition-shadow border border-gray-200"
            >
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center text-4xl">
                    {step.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold">
                      {step.day}
                    </span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-semibold">
                      {step.phase}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
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

