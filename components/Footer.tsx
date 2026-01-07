import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="bg-gray-800 dark:bg-gray-950 text-white py-10 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-700 dark:bg-gray-800 rounded-2xl p-6 sm:p-8 md:p-12 text-center shadow-lg border border-gray-600 dark:border-gray-700">
          <p className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
            {t('message1')}
          </p>
          <p className="text-lg sm:text-xl md:text-2xl font-semibold">
            {t('message2')}
          </p>
        </div>

        <div className="mt-8 sm:mt-10 lg:mt-12 text-center text-gray-400 dark:text-gray-500">
          <p className="text-sm sm:text-base lg:text-lg">{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
