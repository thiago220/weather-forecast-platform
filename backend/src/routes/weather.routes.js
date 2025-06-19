import express from 'express'
import { authenticateToken } from '../middlewares/auth.js'
import { WeatherController } from '../controllers/WeatherController.js'

const router = express.Router()

router.get('/search', authenticateToken, WeatherController.searchByCity)
router.get('/location', authenticateToken, WeatherController.searchByCoords)

export default router
