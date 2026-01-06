export default function Problem() {
  const problems = [
    {
      title: 'Статичність',
      description: 'Вони не знають, що у вас змінилися обставини або рівень енергії. Невиконані задачі накопичуються, викликаючи почуття провини.',
      icon: '📊',
    },
    {
      title: 'Помилка незворотних витрат',
      description: 'Вони зберігають задачі, які вже втратили актуальність, змушуючи користувача робити непотрібну роботу.',
      icon: '💸',
    },
    {
      title: 'Параліч старту',
      description: 'Вони вимагають від користувача самому придумати план дій, коли у нього є лише абстрактна ідея.',
      icon: '🚫',
    },
  ]

  return (
    <section id="features" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Проблема
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Сучасні інструменти продуктивності (Google Calendar, Notion, Todoist) мають три критичні вади:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-5xl mb-4">{problem.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {problem.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

