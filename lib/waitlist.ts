// Helper функція для відправки email до waitlist API

export async function submitWaitlist(email: string): Promise<{
  success: boolean
  message: string
  error?: string
}> {
  try {
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: data.error || 'Помилка відправки',
        error: data.error,
      }
    }

    return {
      success: true,
      message: data.message || 'Дякуємо! Ви успішно додані до списку очікування.',
    }
  } catch (error) {
    console.error('Waitlist submission error:', error)
    return {
      success: false,
      message: 'Помилка з\'єднання. Спробуйте пізніше.',
      error: 'Network error',
    }
  }
}


