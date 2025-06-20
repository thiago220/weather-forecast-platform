import { useEffect, useState } from 'react'
import api from '../services/api'
import LoadingSpinner from './feedback/LoadingSpinner'
import ErrorBox from './feedback/ErrorBox'

interface WeatherData {
  name: string
  main: { temp: number; humidity: number }
  weather: { description: string }[]
}

export default function WeatherByLocation() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')

    if (!navigator.geolocation) {
      setError('Geolocalização não suportada pelo navegador.')
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          const res = await api.get(`/weather/location?lat=${latitude}&lon=${longitude}`)
          setWeather(res.data.data)
        } catch (err: any) {
          setError(err.response?.data?.error || 'Erro ao buscar clima.')
          setWeather(null)
        } finally {
          setLoading(false)
        }
      },
      () => {
        setError('Não foi possível obter sua localização.')
        setLoading(false)
      }
    )
  }, [])

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">Clima na sua localização</h2>

      {loading && <LoadingSpinner message="Obtendo localização..." />}
      {error && <ErrorBox message={error} />}

      {weather && (
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-medium">{weather.name}</h3>
          <p><span className="capitalize">{weather.weather[0].description}</span> -🌡 Temp: {weather.main.temp}°C - 💧 Umidade: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  )
}
