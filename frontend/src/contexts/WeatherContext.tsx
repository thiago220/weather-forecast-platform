import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import api from '../services/api'

interface WeatherData {
  name: string
  main: {
    temp: number
    humidity: number
  }
  weather: {
    description: string
    icon: string
  }[]
}

interface HistoryItem {
  _id: string
  query: string
  createdAt: string
}

interface WeatherContextType {
  data: WeatherData | null
  loading: boolean
  error: string
  history: HistoryItem[]
  fetchWeatherByCity: (city: string) => Promise<void>
  fetchWeatherByLocation: (lat: number, lon: number) => Promise<void>
  refreshHistory: () => Promise<void>
}

const WeatherContext = createContext<WeatherContextType>({} as WeatherContextType)

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [history, setHistory] = useState<HistoryItem[]>([])

  const refreshHistory = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const res = await api.get('/history', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setHistory(res.data?.data || [])
    } catch (err) {
      console.error('[History] erro ao atualizar histórico')
    }
  }

  const fetchWeatherByCity = async (city: string) => {
    setLoading(true)
    setError('')
    try {
      const token = localStorage.getItem('token')
      const res = await api.get(`/weather?city=${encodeURIComponent(city)}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setData(res.data.data)
      await refreshHistory()
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao buscar clima')
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  const fetchWeatherByLocation = async (lat: number, lon: number) => {
    setLoading(true)
    setError('')
    try {
      const token = localStorage.getItem('token')
      const res = await api.get(`/weather/location?lat=${lat}&lon=${lon}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setData(res.data.data)
      await refreshHistory()
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao buscar clima por localização')
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshHistory()
  }, [])

  return (
    <WeatherContext.Provider value={{
      data, loading, error,
      fetchWeatherByCity,
      fetchWeatherByLocation,
      history,
      refreshHistory
    }}>
      {children}
    </WeatherContext.Provider>
  )
}

export const useWeatherContext = () => useContext(WeatherContext)
