import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Flux OS - Перший планер, який розуміє, що життя йде не за планом',
  description: 'AI-асистент для стратегічного планування та адаптивного виконання. План — це не контракт, а маршрут, що постійно перераховується.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk">
      <body className={inter.className}>{children}</body>
    </html>
  )
}


