import express from 'express'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'
import serveStatic from 'serve-static'
import path, { dirname } from 'path'
import corsOptions from './modules/config/cors.js'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express().disable('x-powered-by')

app.use(compression())
app.use(express.json({ extended: true }))
app.use(cookieParser())

app.use(cors(corsOptions))

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

if (process.env.NODE_ENV === 'production') {
  const pathStatic = path.join(__dirname, 'client', 'build')
  const index = 'index.html'
  app.use('/', serveStatic(pathStatic, { index }))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', index))
  })
}

export default app
