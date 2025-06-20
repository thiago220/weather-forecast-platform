import express from 'express'
import { authenticateToken } from '../middlewares/auth.js'
import { WeatherController } from '../controllers/WeatherController.js'
import { sanitizeCity, sanitizeCoordinates } from '../middlewares/sanitize.js'

const router = express.Router()

router.get('/', authenticateToken, sanitizeCity, WeatherController.getByCity)
router.get('/location', authenticateToken, sanitizeCoordinates, WeatherController.getByLocation)

export default router