import { useAuth } from "../contexts/AuthContext";
import WeatherSearch from "../components/WeatherSearch";
import WeatherByLocation from "../components/WeatherByLocation";
import SearchHistory from "../components/SearchHistory";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-6 w-full">
      <div className="w-full flex justify-between items-center bg-white p-4 rounded shadow mb-6">
        <div>
          <h1 className="text-xl font-bold">
            Bem-vindo, {user?.name || "usuário"}!
          </h1>
          <p className="text-gray-600 text-sm">Você está autenticado.</p>
        </div>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Sair
        </button>
      </div>

      <div className="w-full bg-white p-4 rounded shadow mb-6">
        <WeatherByLocation />
      </div>

      <div className="w-full bg-white p-4 rounded shadow mb-6">
        <WeatherSearch />
      </div>

      <div className="w-full bg-white p-4 rounded shadow">
        <SearchHistory />
      </div>
    </div>
  );
}
