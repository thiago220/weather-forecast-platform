import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret'

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']

  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' })
  }

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' })
    }

    req.userId = payload.id
    next()
  })
}
