export default function Solution() {
  return (
    <section id="solution" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Рішення: Flux OS
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-gray-700 mb-6 leading-relaxed">
              Flux OS — це AI-асистент, який поєднує <span className="font-semibold text-primary-700">стратегічне планування</span> (Generative AI) та <span className="font-semibold text-primary-700">тактичне виконання</span> (Adaptive Scheduling).
            </p>
            <p className="text-lg md:text-xl text-gray-600 font-medium">
              Він не просто каже, коли робити задачу, а й запитує, чи варто її робити взагалі.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl shadow-lg p-8 md:p-12 max-w-5xl mx-auto border border-gray-200">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Генеративний AI
              </h3>
              <p className="text-gray-700 text-lg mb-6">
                Створює стратегічні плани з абстрактних ідей, розбиваючи великі цілі на виконувані кроки.
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Адаптивне Планування
              </h3>
              <p className="text-gray-700 text-lg mb-6">
                Постійно перераховує розклад на основі вашого рівня енергії, доступного часу та змінених обставин.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

