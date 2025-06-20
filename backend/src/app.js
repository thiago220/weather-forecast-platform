import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import routes from './routes/index.js'
import { corsOptions } from './config/cors.js'

dotenv.config()

const app = express()

app.use(helmet())
app.use(cors(corsOptions))
app.use(express.json())
app.use('/api', routes)

export default app
