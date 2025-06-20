import { useState } from 'react'
import { useWeatherContext } from '../contexts/WeatherContext'
import LoadingSpinner from './feedback/LoadingSpinner'
import ErrorBox from './feedback/ErrorBox'

export default function WeatherSearch() {
  const [city, setCity] = useState('')
  const { data: weather, loading, error, fetchWeatherByCity } = useWeatherContext()

  const handleSearch = () => {
    if (!city.trim()) return
    fetchWeatherByCity(city)
  }

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">Buscar Clima por Cidade</h2>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Digite a cidade"
          className="flex-1 border border-gray-300 rounded px-3 py-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Buscar
        </button>
      </div>

      {loading && <LoadingSpinner message="Buscando clima..." />}
      {error && <ErrorBox message={error} />}

      {weather && (
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-medium">{weather.name}</h3>
          <p><span className="capitalize">{weather.weather[0].description}</span> - 🌡 Temp: {weather.main.temp}°C - 💧 Umidade: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  )
}
