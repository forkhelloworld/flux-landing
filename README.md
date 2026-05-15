# Flux OS Landing Page

Лендінг-сторінка для Flux OS - першого планера, який розуміє, що життя йде не за планом.

## Технології

- **Next.js 14** - React фреймворк з App Router
- **TypeScript** - типізація коду
- **Tailwind CSS** - стилізація
- **Responsive Design** - адаптивний дизайн для всіх пристроїв

## Встановлення

```bash
# Встановити залежності
npm install

# Запустити dev сервер
npm run dev
```

Відкрийте [http://localhost:3000](http://localhost:3000) у браузері.

## Структура проекту

```
flux-landing/
├── app/
│   ├── layout.tsx      # Основний layout
│   ├── page.tsx        # Головна сторінка
│   └── globals.css     # Глобальні стилі
├── components/
│   ├── Hero.tsx        # Hero секція
│   ├── Problem.tsx     # Секція проблем
│   ├── Solution.tsx    # Секція рішення
│   ├── Modules.tsx     # Секція модулів
│   ├── UserJourney.tsx # Сценарій використання
│   ├── TechStack.tsx   # Технічний стек
│   └── Footer.tsx      # Футер
└── package.json
```

## Особливості

- 🎨 Сучасний та чистий дизайн
- 📱 Повністю адаптивний
- ⚡ Швидкий та оптимізований
- 🎭 Плавні анімації та переходи
- 📧 Waitlist форма з API інтеграцією

## Налаштування Waitlist

### Варіант 1: Resend (Рекомендовано)

1. Зареєструйтеся на [resend.com](https://resend.com)
2. Створіть API key та Audience
3. Створіть файл `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   RESEND_AUDIENCE_ID=your-audience-id
   ```
4. Перейменуйте `app/api/waitlist/route.ts.example` на `route.ts`

### Варіант 2: Supabase

1. Створіть проект на [supabase.com](https://supabase.com)
2. Створіть таблицю `waitlist` (SQL в `app/api/waitlist/supabase-example.ts`)
3. Додайте змінні в `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```
4. Використайте код з `supabase-example.ts` для `route.ts`

Детальні інструкції в `RECOMMENDATIONS.md`
