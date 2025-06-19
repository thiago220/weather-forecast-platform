import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret'

export const AuthService = {
  async register({ name, email, password }) {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw new Error('Usuário já registrado com este e-mail.')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    const token = generateToken(user)

    return { user: sanitizeUser(user), token }
  },

  async login({ email, password }) {
    const user = await User.findOne({ email })
    if (!user) {
      throw new Error('E-mail ou senha inválidos.')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      throw new Error('E-mail ou senha inválidos.')
    }

    const token = generateToken(user)

    return { user: sanitizeUser(user), token }
  },
}

function generateToken(user) {
  return jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: '7d',
  })
}

function sanitizeUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
  }
}
