import dotenv from 'dotenv'
dotenv.config()

export const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY!
export const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5'
