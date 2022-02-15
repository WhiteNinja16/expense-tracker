import React from 'react'
import { InnerNavigate, LoginForm } from '../../../components'

export const LoginPage: React.FC = () => {
  return (
    <div>
      <InnerNavigate title='Вход' linkPath='/' />
      <LoginForm />
    </div>
  )
}
