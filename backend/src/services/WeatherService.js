import axios from 'axios'
import { OPENWEATHER_API_KEY, OPENWEATHER_BASE_URL } from '@/config/openWeather'
import NodeCache from 'node-cache'

const cache = new NodeCache({ stdTTL: 3600 }) 

export class WeatherService {
  static async getByCity(city: string) {
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

  static async getByCoordinates(lat: string, lon: string) {
    const cacheKey = `city:${city.toLowerCase()}`
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
