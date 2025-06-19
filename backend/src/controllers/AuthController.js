import { AuthService } from '../services/AuthService.js'

export const AuthController = {
  async signup(req, res) {
    try {
      const { name, email, password } = req.body
      const result = await AuthService.register({ name, email, password })
      return res.status(201).json(result)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body
      const result = await AuthService.login({ email, password })
      return res.status(200).json(result)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },
}
