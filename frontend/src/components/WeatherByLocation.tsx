import { useEffect, useState } from "react";
import api from "../services/api";
import LoadingSpinner from "./feedback/LoadingSpinner";
import ErrorBox from "./feedback/ErrorBox";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
  };
  clouds: {
    all: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  weather: { description: string; icon: string }[];
}

interface ForecastItem {
  dt_txt: string;
  main: {
    temp: number;
    humidity: number;
  };
  pop: number;
  weather: { description: string; icon: string }[];
}

interface ForecastData {
  list: ForecastItem[];
}

export default function WeatherByLocation() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData["list"]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    if (!navigator.geolocation) {
      setError("Geolocalização não suportada pelo navegador.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await api.get(
            `/weather/location?lat=${latitude}&lon=${longitude}`
          );
          setWeather(res.data.current);
          setForecast(res.data.forecast.list.slice(0, 8));
        } catch (err: any) {
          setError(err.response?.data?.error || "Erro ao buscar clima.");
          setWeather(null);
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Não foi possível obter sua localização.");
        setLoading(false);
      }
    );
  }, []);

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">Clima na sua localização</h2>

      {loading && <LoadingSpinner message="Obtendo localização..." />}
      {error && <ErrorBox message={error} />}

      {weather && (
        <div className="bg-gray-100 p-4 rounded mb-4">
          <h3 className="text-lg font-medium">{weather.name}</h3>
          <p>
            <span className="capitalize">{weather.weather[0].description}</span>{" "}
            <li>
              🌡 Temp Atual: {weather.main.temp}°C (Sensação:{" "}
              {weather.main.feels_like}°C)
            </li>
            <li>
              📉 Mín: {weather.main.temp_min}°C | 📈 Máx:{" "}
              {weather.main.temp_max}°C
            </li>
            <li>
              💧 Umidade: {weather.main.humidity}% | 🌫 Visibilidade:{" "}
              {weather.visibility}m
            </li>
            <li>
              🌬 Vento: {weather.wind.speed} m/s, Direção: {weather.wind.deg}°
              {weather.wind.gust && `, Rajadas: ${weather.wind.gust} m/s`}
            </li>
            <li>
              🌥️ Nuvens: {weather.clouds.all}% | 📊 Pressão:{" "}
              {weather.main.pressure} hPa
            </li>
            <li>
              🌅 Nascer do sol:{" "}
              {new Date((weather.sys.sunrise) * 1000).toLocaleTimeString("pt-BR")}
            </li>
            <li>
              🌇 Pôr do sol:{" "}
              {new Date((weather.sys.sunset) * 1000).toLocaleTimeString("pt-BR")}
            </li>
          </p>
        </div>
      )}

      {forecast.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">
            Previsão (próximas 24h):
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {forecast.map((item, index) => (
              <div
                key={index}
                className="bg-white p-2 rounded shadow text-center"
              >
                <p className="text-sm">
                  {new Date(item.dt_txt).toLocaleString("pt-BR", {
                    weekday: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt={item.weather[0].description}
                  className="mx-auto"
                />
                <p className="capitalize text-sm">
                  {item.weather[0].description}
                </p>
                <p className="text-sm font-medium">🌡 {item.main.temp}°C</p>
                <p className="text-sm font-medium">
                  💧 Umidade: {item.main.humidity}%
                </p>
                <p className="text-sm font-medium">
                  💧 Chuva: {(item.pop * 100).toFixed(0)}%
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
