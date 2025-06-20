import rateLimit from 'express-rate-limit'

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error: 'Muitas requisições feitas a partir deste IP. Tente novamente mais tarde.',
  },
  standardHeaders: true,
  legacyHeaders: false,
})
