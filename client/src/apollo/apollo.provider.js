import React from 'react'
import { App } from '../App'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from './apollo.client'

export const MyApolloProvider = () => (
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
)
