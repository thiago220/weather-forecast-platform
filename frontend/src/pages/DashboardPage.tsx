import { useAuth } from '../contexts/AuthContext'
import WeatherSearch from '../components/WeatherSearch'
import WeatherByLocation from '../components/WeatherByLocation'

export default function DashboardPage() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-md bg-white rounded shadow p-6 text-center mb-6">
        <h1 className="text-xl font-bold mb-2">
          Bem-vindo, {user?.name || 'usuário'}!
        </h1>
        <p className="text-gray-600 mb-4">Você está autenticado.</p>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Sair
        </button>
      </div>

      <WeatherByLocation />
      <WeatherSearch />
    </div>
  )
}
