import { useState } from 'react'
import api from '../services/api'
import LoadingSpinner from './feedback/LoadingSpinner'
import ErrorBox from './feedback/ErrorBox'

interface WeatherData {
  name: string
  main: { temp: number; humidity: number }
  weather: { description: string }[]
}

export default function WeatherSearch() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchWeather = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await api.get(`/weather?city=${city}`)
      setWeather(res.data.data)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao buscar clima.')
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow mt-6">
      <h2 className="text-xl font-semibold mb-4">Buscar Clima por Cidade</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Digite a cidade"
          className="flex-1 border border-gray-300 rounded px-3 py-2"
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Buscar
        </button>
      </div>

      {loading && <LoadingSpinner message="Buscando clima..." />}
      {error && <ErrorBox message={error} />}

      {weather && (
        <div className="bg-gray-100 p-4 rounded mt-4">
          <h3 className="text-lg font-medium">{weather.name}</h3>
          <p className="capitalize">{weather.weather[0].description}</p>
          <p>🌡 Temp: {weather.main.temp}°C</p>
          <p>💧 Umidade: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  )
}
