import request from 'supertest'
import app from '../../app.js'

export const getTestToken = async () => {
  const loginData = {
    email: 'thiago@example.com',
    password: '123456',
  }

  const res = await request(app).post('/api/auth/login').send(loginData)

  if (res.statusCode !== 200) {
    throw new Error(`Erro ao logar: ${res.body.error || res.statusCode}`)
  }

  return res.body.token
}
