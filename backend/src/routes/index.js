import express from 'express'
import authRoutes from './auth.routes.js'
import weatherRoutes from './weather.routes.js'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/weather', weatherRoutes)

export default router
