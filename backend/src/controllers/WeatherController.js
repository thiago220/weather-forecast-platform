import { WeatherService } from '../services/WeatherService.js'
import { citySchema, coordsSchema } from '../validators/weatherValidator.js'
import SearchHistory from '../models/SearchHistory.js'

export class WeatherController {
  static async getByCity(req, res) {
    const { error, value } = citySchema.validate(req.query)
    if (error) return res.status(400).json({ error: error.details[0].message })

    const data = await WeatherService.getByCity(value.city)

    if (req.user?.id && value.city) {
        await SearchHistory.create({ userId: req.user.id, query: value.city })
    }

    const links = {
        self: `/weather?city=${encodeURIComponent(value.city)}`,
        by_location: `/weather/location?lat=${data.coord.lat}&lon=${data.coord.lon}`,
        forecast: `/forecast?city=${encodeURIComponent(value.city)}`,
    }

    return res.status(200).json({
        data,
        _links: links,
    })
  }

  static async getByLocation(req, res) {
    const { error, value } = coordsSchema.validate(req.query)
    if (error) return res.status(400).json({ error: error.details[0].message })

    const data = await WeatherService.getByCoordinates(value.lat, value.lon)
    const links = {
        self: `/weather/location?lat=${value.lat}&lon=${value.lon}`,
        by_city: `/weather?city=${encodeURIComponent(data.name)}`,
        forecast: `/forecast?lat=${value.lat}&lon=${value.lon}`,
    }

    return res.status(200).json({
        data,
        _links: links,
    })
  }
}
