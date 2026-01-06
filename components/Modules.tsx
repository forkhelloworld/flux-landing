export default function Modules() {
  const modules = [
    {
      title: 'The Blueprint',
      subtitle: 'Генератор Стратегії',
      problem: 'Я не знаю, з чого почати',
      features: [
        'Input-to-Plan: Користувач вводить намір',
        'Context Interview: AI задає 3-4 уточнюючих питання',
        'Tree Generation: Система будує ієрархічне дерево (Ціль → Гіпотези → Фази → Задачі)',
        'Auto-Tagging: Кожна задача отримує теги (тип енергії, оцінка часу)',
      ],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'The Flow Engine',
      subtitle: 'Адаптивне Виконання',
      problem: 'У мене немає сил/часу на цей план сьогодні',
      features: [
        'Morning Check-in: Питає про рівень енергії та доступний час',
        'Dynamic Filtering: Адаптує задачі під ваш рівень енергії',
        'Liquid Time: Знаходить ідеальні задачі для коротких вікон часу',
        'GPS-Rescheduling: Мовчки перераховує розклад без стресу',
      ],
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'The Relevance Engine',
      subtitle: 'Двигун Актуальності',
      problem: 'Я роблю те, що вже не має сенсу',
      features: [
        'Hypothesis Testing: Задачі прив\'язані до гіпотез',
        'Impact Feedback: Оцінка впливу задачі на мету',
        'Rotting Tasks Protocol: Блокує задачі, що переносяться 3+ рази',
      ],
      color: 'from-orange-500 to-red-500',
    },
    {
      title: 'Інтерфейс та UX',
      subtitle: 'Фокус на виконанні',
      problem: 'Відволікання та перевантаження',
      features: [
        'Focus Mode: На екрані завжди одна задача',
        'Swipe Control: Інтуїтивне керування жестами',
        'Panic Button: Режим для вигорання з монохромним інтерфейсом',
      ],
      color: 'from-green-500 to-emerald-500',
    },
  ]

  return (
    <section id="modules" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Ключові Модулі
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Чотири потужні модулі, які працюють разом для створення адаптивної системи планування
          </p>
        </div>

        <div className="space-y-12">
          {modules.map((module, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-8 md:p-12 hover:shadow-lg transition-shadow border border-gray-200"
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className={`inline-block bg-gray-800 text-white px-6 py-3 rounded-lg font-bold text-lg mb-4`}>
                    Модуль {index + 1}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {module.title}
                  </h3>
                  <p className="text-xl text-gray-600 font-semibold mb-4">
                    {module.subtitle}
                  </p>
                  <p className="text-lg text-gray-600 italic">
                    Вирішує проблему: "{module.problem}"
                  </p>
                </div>
                <div className="md:w-2/3">
                  <ul className="space-y-4">
                    {module.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <span className="text-green-500 mr-3 text-xl font-bold">✓</span>
                        <span className="text-gray-700 text-lg">{feature}</span>
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

