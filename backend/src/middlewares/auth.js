import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret'

export function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = jwt.verify(token, JWT_SECRET)

    if (typeof decoded === 'object' && 'id' in decoded) {
      req.user = decoded
      return next()
    }

    return res.status(401).json({ error: 'Token malformado' })
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' })
  }
}
