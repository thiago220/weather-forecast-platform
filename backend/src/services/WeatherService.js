import axios from 'axios'
import { OPENWEATHER_API_KEY, OPENWEATHER_BASE_URL } from '../config/openWeather.js'
import NodeCache from 'node-cache'

const cache = new NodeCache({ stdTTL: 600 }) 

export class WeatherService {
  static async getByCity(city) {
    const cacheKey = `city:${city.toLowerCase()}`
    const cached = cache.get(cacheKey)
    if (cached) return cached
    const res = await axios.get(`${OPENWEATHER_BASE_URL}/weather`, {
      params: {
        q: city,
        appid: OPENWEATHER_API_KEY,
        units: 'metric',
        lang: 'pt_br',
      },
    })
    return res.data
  }

  static async getByCoordinates(lat, lon) {
    const cacheKey = `coords:${lat},${lon}`
    const cached = cache.get(cacheKey)
    if (cached) return cached
    const res = await axios.get(`${OPENWEATHER_BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: OPENWEATHER_API_KEY,
        units: 'metric',
        lang: 'pt_br',
      },
    })
    return res.data
  }
}
