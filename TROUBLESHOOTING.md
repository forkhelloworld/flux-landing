# Troubleshooting Waitlist Email

## Помилка: "Не вдалося відправити email"

### 1. Перевірте консоль сервера
Подивіться детальні логи в консолі де запущений `npm run dev`. Там буде точна помилка.

### 2. Найчастіші причини:

#### A. RESEND_FROM_EMAIL не налаштований
**Помилка:** `422 - domain not verified` або `invalid from address`

**Рішення:**
- Для тестування використовуйте `onboarding@resend.dev` (працює без налаштування)
- Або верифікуйте свій домен в Resend Dashboard → Domains

```env
RESEND_FROM_EMAIL=onboarding@resend.dev
```

#### B. Домен не верифікований
**Помилка:** `422 - domain verification required`

**Рішення:**
1. Зайдіть в Resend Dashboard → Domains
2. Додайте ваш домен
3. Додайте DNS записи які показує Resend
4. Дочекайтесь верифікації (зазвичай кілька хвилин)

#### C. Неправильний API ключ
**Помилка:** `403 - unauthorized` або `invalid api key`

**Рішення:**
- Перевірте що `RESEND_API_KEY` правильний
- Створіть новий ключ в Resend Dashboard → API Keys
- Перезапустіть dev сервер після зміни `.env.local`

#### D. Ліміт досягнуто
**Помилка:** `429 - rate limit exceeded`

**Рішення:**
- Безкоштовний план: 3,000 emails/місяць
- Дочекайтесь або оновіть план

### 3. Швидкий тест

Додайте в `.env.local`:
```env
RESEND_API_KEY=ваш_ключ
RESEND_FROM_EMAIL=onboarding@resend.dev
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

`onboarding@resend.dev` працює без налаштування для тестування.

### 4. Перевірка в Resend Dashboard

1. Зайдіть в Resend Dashboard → Emails
2. Подивіться чи є спроби відправки
3. Якщо є - подивіться деталі помилки


