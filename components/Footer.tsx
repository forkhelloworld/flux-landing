export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-700 rounded-2xl p-8 md:p-12 text-center shadow-lg border border-gray-600">
          <p className="text-2xl md:text-3xl font-bold mb-4">
            Flux — це не інструмент для того, щоб робити більше.
          </p>
          <p className="text-xl md:text-2xl font-semibold">
            Це інструмент для того, щоб робити те, що має сенс, і не збожеволіти
            в процесі.
          </p>
        </div>

        <div className="mt-12 text-center text-gray-400">
          <p className="text-lg">© 2026 Flux OS. Всі права захищені.</p>
        </div>
      </div>
    </footer>
  );
}
