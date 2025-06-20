import app from './src/app.js'
import { connectDB } from './src/config/db.js'

const PORT = process.env.PORT || 5000

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`)
    })
  })
  .catch((err) => {
    console.error('Erro crítico ao iniciar o servidor:', err)
  })
