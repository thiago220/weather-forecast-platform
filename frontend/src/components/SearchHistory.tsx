import { useWeatherContext } from "../contexts/WeatherContext";

export default function SearchHistory() {
  const { history, fetchWeatherByCity, loading, error } = useWeatherContext();

  if (loading) return <p className="text-gray-500">Carregando histórico...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (history.length === 0)
    return <p className="text-gray-500">Nenhuma busca recente.</p>;

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">Histórico de buscas</h2>
      <ul className="space-y-3">
        {history.map((item) => (
          <li
            key={item._id}
            className="p-3 bg-gray-50 rounded border hover:shadow transition-all"
          >
            <div className="flex justify-between items-center">
              <button
                onClick={() => fetchWeatherByCity(item.query)}
                className="text-blue-600 font-semibold hover:underline text-left"
              >
                {item.query}
              </button>
              <span className="text-xs text-gray-500">
                {new Date(item.createdAt).toLocaleString()}
              </span>
            </div>

            {item.weather?.main && item.weather?.weather?.[0] && (
              <div className="text-sm text-gray-700 mt-1">
                <p>
                  <span className="capitalize">
                    {item.weather.weather[0].description}
                  </span>{" "}
                  - 🌡 Temp: {item.weather.main.temp}°C - 💧 Umidade: {" "}
                  {item.weather.main.humidity}%
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
