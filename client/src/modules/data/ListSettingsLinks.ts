export interface SettingsMainLink {
  id: number
  to: string
  title: string
  icon: string
}

export const settingsLinks = [
  { id: 0, to: '/categories', title: 'Категории', icon: 'categories' },
  { id: 1, to: 'email', title: 'Электронная почта', icon: 'mail' },
  { id: 2, to: 'security', title: 'Безопасность', icon: 'lock' },
  { id: 3, to: 'language-currency', title: 'Язык и валюта', icon: 'pin' },
  { id: 4, to: 'appearance', title: 'Внешний вид', icon: 'brush' },
  { id: 5, to: '/help', title: 'Помощь', icon: 'question' }
]
