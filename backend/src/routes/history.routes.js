import express from 'express'
import HistoryController from '../controllers/HistoryController.js'
import { authenticateToken } from '../middlewares/auth.js'

const router = express.Router()

router.post('/', authenticateToken, HistoryController.save)
router.get('/', authenticateToken, HistoryController.list)

export default router
