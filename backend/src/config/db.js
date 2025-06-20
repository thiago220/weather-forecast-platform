import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB conectado')
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err)
    throw err
  }
}
