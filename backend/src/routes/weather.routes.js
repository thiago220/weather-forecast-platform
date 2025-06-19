import express from 'express'
import { authenticateToken } from '../middlewares/auth.js'
import { WeatherController } from '../controllers/WeatherController.js'

const router = express.Router()

router.get('/weather', authenticateToken, WeatherController.getByCity)
router.get('/weather/location', authenticateToken, WeatherController.getByLocation)

export default router