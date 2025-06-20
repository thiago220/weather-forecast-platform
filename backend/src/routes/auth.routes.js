import express from 'express'
import { AuthController } from '../controllers/AuthController.js'
import { sanitizeLogin } from '../middlewares/sanitize.js'

const router = express.Router()

router.post('/signup', AuthController.signup)
router.post('/login', sanitizeLogin, AuthController.login)

export default router
