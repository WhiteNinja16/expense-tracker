export interface MainLink {
  id: number
  to: string
  title: string
  iconName: string
  loader: string
}

export const mainLinks: MainLink[] = [
  { id: 0, to: '', title: 'Главная', iconName: 'home', loader: '🏠' },
  { id: 1, to: 'transactions', title: 'Операции', iconName: 'transactions', loader: '💰' },
  { id: 2, to: 'analytics', title: 'Аналитика', iconName: 'analytics', loader: '📊️' },
  { id: 3, to: 'settings', title: 'Настройки', iconName: 'settings', loader: '⚙' }
]
