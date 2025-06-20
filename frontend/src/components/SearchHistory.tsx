import { useWeatherContext } from '../contexts/WeatherContext'

export default function SearchHistory() {
  const { history, fetchWeatherByCity, loading, error } = useWeatherContext()

  const handleClick = (query: string) => {
    fetchWeatherByCity(query)
  }

  if (loading) return <p className="text-gray-500">Carregando histórico...</p>
  if (error) return <p className="text-red-500">{error}</p>
  if (history.length === 0) return <p className="text-gray-500">Nenhuma busca recente.</p>

  return (
    <div className="mt-6 max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-2">Histórico de buscas</h2>
      <ul className="bg-white rounded shadow p-4 space-y-2">
        {history.map((item) => (
          <li
            key={item._id}
            onClick={() => handleClick(item.query)}
            className="cursor-pointer text-blue-600 hover:underline"
          >
            {item.query}
          </li>
        ))}
      </ul>
    </div>
  )
}
