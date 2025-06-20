import express from 'express'
import authRoutes from './auth.routes.js'
import weatherRoutes from './weather.routes.js'
import historyRoutes from './history.routes.js'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/weather', weatherRoutes)
router.use('/history', historyRoutes)

export default router
