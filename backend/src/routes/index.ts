import { Router } from 'express'

export const router = Router()

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

router.get('/hello', (_req, res) => {
  res.json({ message: 'Hello from the backend!' })
})
